<script setup>
import { ref } from 'vue'
import { HubConnectionBuilder } from "@microsoft/signalr";

const route = useRoute()
const loginStore = UseLoginStore()

const isAwaiting = ref(true)
const localStream = ref({})
const playerInfos = ref({})
const connection = new HubConnectionBuilder().withUrl("/api/signal").build()


const matchInfo = ref({
  "id": "",
  "matchStart": null,
  "matchEnd": null,
  "matchResult": null,
  "websocketURL": null,
  "playersIds": []
})

const streams = ref({})
const peers = ref([])


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
    if (streams[element]) plr.stream = streams[element]
    plrs.push(plr)
  });
  return plrs
})

async function updateMatchInfo() {
  let info = await apiMatchInfo(route.params["ID"])
  if (!info.isError) matchInfo.value = info.info;
}

var pc_config = { "iceServers": [{ "urls": ["stun:stun.l.google.com:19302"] }] };
var pc_constraints = { "optional": [{ "DtlsSrtpKeyAgreement": true }] };

function createPeer(userToSignal, callerID, stream) {

  const localConnection  = new RTCPeerConnection(pc_config, pc_constraints);

  localConnection.onicecandidate = (candidate) => {
    candidate && connection.invoke("Candidate", userToSignal, candidate)
  }
  
  localConnection.ontrack = (stream) => {
    streams[userToSignal] = stream
  }

  localConnection
      .createOffer()
      .then(offer => localConnection.setLocalDescription(offer))
      .then(() => {
        connection.invoke('Offer', userToSignal, localConnection.localDescription);
      });

  return localConnection;
}


onMounted(async () => {
  await getUserMedia();
  await updateMatchInfo()
  connection.start().then(() => connection.invoke("Join", route.params["ID"]))

  connection.on("Connected", (users) => {
    const tempPeers = {};
    for (let i = 0; i < users.length; i++) {
      const userID = users[i];
      const peer = createPeer(userID, loginStore.ID, localStream);
      tempPeers.push(peer);
    }
    peers.value = tempPeers
  })

  connection.on("Offer", (id, invoker_id, description) => {
    console.log(id)
    console.log(description)
  })

  connection.on("Candidate", (id, invoker_id, description) => {
    console.log(id)
    console.log(description)
  })

  connection.on("Refresh", () => { updateMatchInfo() })
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
    } catch (error) {
      console.log(`getUserMedia error: ${error}`);
    }
  }
}
</script>

<template>
  <div class="match_page">
    <dev class="left_block">
      <dev class="main_cameras" id="host_camera">
        <video_block></video_block>
      </dev>
      <dev class="main_cameras" id="active_camera">
        <video_block></video_block>
      </dev>
      <dev class="main_cameras" id="player_camera">
        <video_block :stream="localStream" :muted="true"></video_block>
      </dev>
      <dev class="service_field">

      </dev>
    </dev>
    <dev class="right_block">
      <dev class="other_cameras">
        <div class="cam" v-for="plr in players">
          <player :info="plr"></player>
        </div>

      </dev>
    </dev>
  </div>

  <div class="awaiting_page" v-if="isAwaiting">

  </div>
</template>

<style scoped>
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