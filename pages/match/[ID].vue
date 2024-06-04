<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { HubConnectionBuilder, JsonHubProtocol } from "@microsoft/signalr";

const router = useRouter()
const route = useRoute()
const loginStore = UseLoginStore()

const isAwaiting = ref(true)
const localStream = ref({})
const playerInfos = ref({})
let connection = {}


const matchInfo = ref({
  "id": "",
  "matchStart": null,
  "matchEnd": null,
  "matchResult": null,
  "websocketURL": null,
  "playersIds": []
})

const streams = ref({})
const peers = ref({})


async function startMatch() {
  isAwaiting.value = false
}

const players = computed(() => {
  let plrs = []
  matchInfo.value.playersIds.forEach(element => {
    let plr = {
      username: "",
      role: "",
      stream: null
    }
    if (element == loginStore.ID) return;
    if (streams.value[element]) plr.stream = streams.value[element]
    plrs.push(plr)
  });
  return plrs
})

async function updateMatchInfo() {
  let info = await apiMatchInfo(route.params["ID"])
  if (!info.isError) matchInfo.value = info.info;
  if (info.isError) router.push('/lobby')
}

var pc_config = { "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }] };
var pc_constraints = { "optional": [{ "DtlsSrtpKeyAgreement": true }] };

function createPeer(userToSignal, callerID) {

  const localConnection = new RTCPeerConnection();

  localStream.value.getTracks().forEach(track => localConnection.addTrack(track, localStream.value));

  localConnection.onicecandidate = ({ candidate }) => {
    candidate && connection.invoke("Candidate", userToSignal, JSON.stringify(candidate))
  }

  localConnection.ontrack = ({ streams: [ stream ] }) => {
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

  connection.on("Connected", (users) => {
    console.log("Connected")
    console.log(users)
    for (let i = 0; i < users.length; i++) {
      const userID = users[i];
      console.log(userID)
      if(userID == loginStore.ID) continue
      createPeer(userID, loginStore.ID);
    }
  })

  connection.on("IncomingOffer", (invoker_id, description) => {
    console.log("Offer from " + invoker_id)
    console.log(JSON.parse(description))
    const localConnection = new RTCPeerConnection();

    localStream.value.getTracks().forEach(track => localConnection.addTrack(track, localStream.value));

    localConnection.onicecandidate = ({ candidate }) => {
      candidate && connection.invoke("Candidate", invoker_id, JSON.stringify(candidate))
    }

    localConnection.ontrack = ({ streams: [ stream ] }) => {
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
</script>

<template>
  <div class="match_page">
    <div class="left_block">
      <div class="main_cameras" id="host_camera">
        <video_block></video_block>
      </div>
      <div class="main_cameras" id="active_camera">
        <video_block></video_block>
      </div>
      <div class="main_cameras" id="player_camera">
        <video_block :stream="localStream" :muted="true"></video_block>
      </div>
      <div class="service_field">

      </div>
    </div>
    <div class="right_block">
      <div class="other_cameras">
        <div class="cam" v-for="plr in players">
          <player :info="plr"></player>
        </div>

      </div>
    </div>
  </div>

  <div class="awaiting_page" v-if="isAwaiting">

  </div>
</template>

<style scoped>
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
  width: 20%;
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
</style>