<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { HubConnectionBuilder, JsonHubProtocol } from "@microsoft/signalr";
import { apiMatchesIdGetState, apiMatchesIdSwitchState } from '~/utils/api';

const router = useRouter()
const route = useRoute()
const loginStore = UseLoginStore()

const isAwaiting = ref(true)
const localStream = ref({})
const playerInfos = ref({})
const roles = ref({})
let connection = {}
const currentStage = ref(0)
const allRoles = ref([])

const matchInfo = ref({
  id: "",
  matchStart: null,
  matchEnd: null,
  matchResult: null,
  playersIds: []
})



const streams = ref({})
const peers = ref({})


async function startMatch() {
  isAwaiting.value = false
  let request = []
  for(let el_id in listOfRoles.value.roles){
    let element = listOfRoles.value.roles[el_id]
    if (element.status)
    request.push({id: element.id, count: 1})
  }
  request.push({id: mafiaRoleId.value, count: listOfRoles.value.mafia})
  apiMatchesIdStart(route.params["ID"], request)
}

const players = computed(() => {
  let plrs = []
  matchInfo.value.playersIds.forEach(element => {
    let plr = {
      username: "",
      role: "",
      playerID: element,
      stream: null,
      isAlive: true,
      sleep: false
    }
    
    if (roles.value != undefined && roles.value[element] != null) {
      plr.role = roles.value[element].role
      plr.isAlive = roles.value[element].isAlive
    }
    let role_ = -1
    for (const key in allRoles.value) {
        const element_ = allRoles.value[key];
        console.log(element_.name)
        if(element_.name == mePlayer.value.role) {
          role_ = element_;
          break;
        }
    }
    if (mePlayer.role != "Host")
      if (currentStage.value != 0 && role_ != -1 && role_ != undefined) {
        if(plr.role == mePlayer.value.role && role_.priority == currentStage.value){
          plr.sleep = false
        }else {
          plr.sleep = true
        }
      }
    if (streams.value[element]) plr.stream = streams.value[element]
    plrs.push(plr)
  });
  return plrs
})

const playersForWebs = computed(() => {
  let plrs = []
  players.value.forEach(element => {
    if (element.playerID == loginStore.ID) return;
    if (element.playerID == hostPlayer.value.playerID) return;
    plrs.push(element)
  })
  return plrs
})

const hostPlayer = computed(() => {
  for (let i = 0; i < players.value.length; i++) {
    const plr = players.value[i];
    if (plr.role == "Host") {
      plr.isAlive = true
      plr.sleep = false
      return plr
    }
  }
  return {
    isAlive: true,
    username: "",
    role: "",
    playerID: "",
    stream: null,
    sleep: false
  };
})

const mePlayer = computed(() => {
  for (let i = 0; i < players.value.length; i++) {
    const plr = players.value[i];
    if (plr.playerID == loginStore.ID) {
      return plr
    }
  }
  return {
    isAlive: true,
    username: "",
    role: "",
    playerID: "",
    stream: null,
    sleep: false
  };
})


async function updateMatchInfo() {
  let info = await apiMatchInfo(route.params["ID"])
  if (!info.isError) matchInfo.value = info.info;
  if (info.isError) router.push('/lobby')
  let _roles = await apiMatchesIdGetRoles(route.params["ID"])
  currentStage.value = await getCurrentStage();
  if (!_roles.isError) roles.value = _roles.info;
  if (matchInfo.value.matchStart != null)
    isAwaiting.value =  false;
}

const configuration = {
  "iceServers": [{ "url": "stun:stun.l.google.com:19302" },
  { "url": "stun:stun1.l.google.com:19302" },
  { "url": "stun:stun2.l.google.com:19302" },
  { "url": "stun:stun3.l.google.com:19302" },
  { "url": "stun:stun4.l.google.com:19302" },
  ]
};


function createPeer(userToSignal, callerID) {

  const localConnection = new RTCPeerConnection(configuration);

  localStream.value.getTracks().forEach(track => localConnection.addTrack(track, localStream.value));

  localConnection.onicecandidate = ({ candidate }) => {
    candidate && connection.invoke("Candidate", userToSignal, JSON.stringify(candidate))
  }

  localConnection.ontrack = ({ streams: [stream] }) => {
    console.log("STREAM!!! (from create)")
    console.log(stream)
    streams.value[userToSignal] = stream
  }

  peers.value[userToSignal] = localConnection
  localConnection
    .createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() => {
      connection.invoke('Offer', userToSignal, JSON.stringify(localConnection.localDescription));
    });

  return localConnection;
}

onMounted(async () => {
  connection = new HubConnectionBuilder().withUrl("/api/signal").build()
  await getUserMedia();
  await updateMatchInfo()
  updateRolesList();
  connection.on("Connected", (users) => {
    console.log("Connected")
    console.log(users)
    for (let i = 0; i < users.length; i++) {
      const userID = users[i];
      console.log(userID)
      if (userID == loginStore.ID) continue
      createPeer(userID, loginStore.ID);
    }
  })

  connection.on("IncomingOffer", (invoker_id, description) => {
    console.log("Offer from " + invoker_id)
    console.log(JSON.parse(description))
    const localConnection = new RTCPeerConnection(configuration);

    localStream.value.getTracks().forEach(track => localConnection.addTrack(track, localStream.value));

    localConnection.onicecandidate = ({ candidate }) => {
      candidate && connection.invoke("Candidate", invoker_id, JSON.stringify(candidate))
    }

    localConnection.ontrack = ({ streams: [stream] }) => {
      console.log("STREAM!!! (from offer)")
      console.log(stream)
      streams.value[invoker_id] = stream
    }
    peers.value[invoker_id] = localConnection
    localConnection
      .setRemoteDescription(JSON.parse(description))
      .then(() => localConnection.createAnswer())
      .then(answer => localConnection.setLocalDescription(answer))
      .then(() => {
        console.log(localConnection.localDescription)
        connection.invoke('Answer', invoker_id, JSON.stringify(localConnection.localDescription));
      });
  })

  connection.on("IncomingAnswer", (invoker_id, description) => {
    console.log("Answer from " + invoker_id)
    console.log(JSON.parse(description))
    peers.value[invoker_id].setRemoteDescription(JSON.parse(description))
  })

  connection.on("CandidateOffer", (invoker_id, description) => {
    console.log("Candidate")
    console.log(description)
    peers.value[invoker_id].addIceCandidate(new RTCIceCandidate(JSON.parse(description)));
  })

  connection.on("Refresh", () => { updateMatchInfo() })
  connection.start().then(() => connection.invoke("Join", route.params["ID"]))
})

onUnmounted(() => {
  connection.invoke("Disconnect", route.params["ID"], loginStore.username)
  connection.stop()
})

async function getUserMedia() {
  if ("mediaDevices" in navigator) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      localStream.value = stream;
      console.log(stream)
    } catch (error) {
      console.log(`getUserMedia error: ${error}`);
    }
  }
}


const hostMenuInfo = ref({
  contextMenuPos: {},
  show: false,
  id: ""
})


const listOfRoles = ref({mafia: 0, roles: []})
const mafiaRoleId = ref("")

async function updateRolesList(){
  let allRoles_ = await apiRolesGetRoles()
  listOfRoles.value.roles = []
  allRoles.value = []
  for (let el_ind in allRoles_) {
    let element = allRoles_[el_ind]
    allRoles.value.push({ id: element.id, name: element.name, priority: element.priority, status: false })
    if(element.name == "Mafia") mafiaRoleId.value = element.id
    if(element.priority == -1 || element.name == "Mafia") continue
    listOfRoles.value.roles.push({ id: element.id, name: element.name, priority: element.priority, status: false })
  }
}



const imHost = computed(() => {
  return hostPlayer.value != null && hostPlayer.value.playerID == loginStore.ID
})


async function killPlayer(ID) {
  await apiMatchesIdKill(route.params["ID"], ID)
}

async function nextStage() {
  await apiMatchesIdSwitchState(route.params["ID"])
}

async function getCurrentStage() {
  return await apiMatchesIdGetState(route.params["ID"])
}

</script>

<template>
  <div class="match_page">
    <div class="left_block">
      <div class="main_cameras" id="host_camera">
        <video_block :stream="localStream" :muted="true" v-if="imHost"></video_block>
        <player :info="hostPlayer" v-else></player>
      </div>
      <div class="main_cameras" id="active_camera">
        <video_block></video_block>
      </div>
      <div class="main_cameras" id="player_camera" v-if="!imHost">
        <video_block :stream="localStream" :muted="true"></video_block>
      </div>
      <div class="host_controller" v-else>
        <input class="text_field" type="text" value="Field for notes" />
        <input class="enter_button" type="button" value="Next Stage" @click="nextStage()" />
        <p>{{ currentStage }}</p>
      </div>
      <div class="service_field">
        <p>Your role: {{ mePlayer.role }}</p>
      </div>
    </div>
    <div class="right_block">
      <div class="other_cameras">
        <div class="cam" v-for="plr in playersForWebs"
          @contextmenu.prevent="hostMenuInfo.show = true; hostMenuInfo.contextMenuPos = { x: $event.x, y: $event.y }; hostMenuInfo.id = plr.playerID">
          <player :info="plr"></player>
        </div>
        <div class="context_menu" v-if="hostMenuInfo.show && imHost"
          :style="{ position: 'fixed', left: hostMenuInfo.contextMenuPos.x + 'px', top: hostMenuInfo.contextMenuPos.y + 'px' }">
          <input class="enter_button" type="button" value="kill him" @click="killPlayer(hostMenuInfo.id)">
        </div>
      </div>
    </div>
  </div>

  <div class="awaiting_page" v-if="isAwaiting && imHost">
    <div class="awaiting_menu">
      <div class="other_roles" v-for="role in listOfRoles.roles">
        <input :id="'checkbox_' + role.name" type="checkbox" v-model="role.status">
        <label :for="'checkbox_' + role.name"> {{ role.name }} </label>
      </div>
      <div class="mafia">
        <label for="mafia_counter"> Number Of Mafia </label>
        <input id="mafia_counter" type="number" v-model="listOfRoles.mafia" />
      </div>
      <div>
        <input class="enter_button" type="button" value="Start Match" @click="startMatch">
      </div>
    </div>
  </div>
</template>

<style scoped>
.match_page>* {
  user-select: none;
  caret-color: transparent;
}

.cam {
  width: 25%;
  box-sizing: border-box;

}

.main_cameras {
  aspect-ratio: 16/9;
  box-sizing: border-box;
}

.other_cameras {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 10px;
  flex-wrap: wrap;
}

#player_camera {
  width: 100%;
}

.match_page {
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
}

.left_block {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: solid 1px white;
  width: 25%;
  padding: 10px;
  box-sizing: border-box;
  gap: 10px;
}

.right_block {
  display: flex;
  border: solid 1px white;
  flex-grow: 1;
  box-sizing: border-box;
}

.awaiting_page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
}

.awaiting_menu {
  display: flex;
  flex-direction: column;
}

.enter_button {
  width: max-content;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  color: white;
  background-color: #550066;
}

.enter_button:hover {
  background-color: #770088;
}
</style>