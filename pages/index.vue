<script setup>

const roles = ref([{
    name: "Mafia",
    description: "During the night scene they lurk in the dark and kill one player from Citizen party each night. Their goal is to kill Citizen party.",
    picturePath: "/static/img/roles/Mafia.png"
}, {
    name: "Citizen",
    description: "A peaceful player who has no turns during night. Their goal is to find and kick out all Mafia and Don during day voting.",
    picturePath: "/static/img/roles/Citizen.png"
}, {
    name: "Doctor",
    description: "Also belongs to Citizen party. At night he can come to one of the players and save his life. Can save himself once per game.",
    picturePath: "/static/img/roles/Doctor.png"
}, {
    name: "Sheriff",
    description: "Also belongs to Citizen party. During the night scene he can check any player's identity for belonging to the Mafia. Sheriff must apply this knowledge during the daily voting.",
    picturePath: "/static/img/roles/Sheriff.png"
}, {
    name: "Don",
    description: "Also belongs to Mafia party. During the night scene he can check any player's identity for belonging to the Sheriff.",
    picturePath: "/static/img/roles/Don.png"
}, {
    name: "Master",
    description: "Rules the game process. Rules may vary in different versions of the Mafia game including custom roles.",
    picturePath: "/static/img/roles/Master.png"
}])
</script>

<template>
    <div class="block_content">
        <div class="header">
            <h1>Mafia!<img :draggable="false" src="~/assets/img/mafia.png" height="150" width="150"></img></h1>
        </div>
        <div class="content">
            <img :draggable="false" src="~/assets/img/game-pic.png"></img>
        </div>
        <div class="content">
            <b>Mafia, also known as Werewolf, is a Russian social deduction game created by Dimitry Davidoff in 1986.
                The
                game models a conflict between two groups: an informed minority (the mafiosi or the werewolves) and an
                uninformed majority (the villagers). At the start of the game, each player is secretly assigned a role
                affiliated with one of these teams. The game has two alternating phases: first, a night-phase, during
                which
                those with night-killing-powers may covertly kill other players, and second, a day-phase, in which all
                surviving players debate and vote to eliminate a suspect. The game continues until a faction achieves
                its
                win-condition; for the village, this usually means eliminating the evil minority, while for the
                minority,
                this usually means reaching numerical parity with the village and eliminating any rival evil groups.</b>
        </div>
        <div class="roles">
            <h1>Roles</h1>
            <Role v-for="(el) in roles" :role="el" />
        </div>
    </div>
</template>

<style scoped>
* {
    font-weight: normal;
    cursor: default;
    user-select: none;
    padding: 0;
}

.block_content {
    padding: 32px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.header {
    width: 100%;
    text-align: center;
    border: 10px outset;
    border-color: rgba(55, 18, 90, 0.322);
    border-radius: 60px;
    /* mix-blend-mode:normal; */
    opacity: 90%;
    padding: 5px;
    margin: 50px;
    background-color: #ff9d855e;
}

.header h1 {
    font-size: 200px;
    color: rgba(55, 18, 90, 0.603);
    color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
    text-shadow: #91ff70;
    text-indent: 10%;
    font-family: fantasy;
    /* background-image: url('./res/bg.png'); */
}

.header h2 {
    font-size: 100px;
    color: rgba(55, 18, 90, 0.603);
    color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
    text-shadow: #91ff70;
    text-indent: 10%;
    font-family: fantasy;
    /* background-image: url('./res/bg.png'); */
}

.content {
    text-align: justify;
    padding: 50px;
}

.content img {
    width: 100%;
    height: auto;
}

.content b {
    margin: 50px;
    text-align: center;
    font-size: 40px;
    color: rgba(160, 160, 160, 0.548);
    color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
    text-shadow: #91ff70;
    text-indent: 50px;
    font-family: fantasy;
}

.roles {
    text-align: center;
    border: 10px outset;
    border-color: rgba(55, 18, 90, 0.322);
    border-radius: 60px;
    /* mix-blend-mode:normal; */
    opacity: 90%;
    padding: 5px;
    margin: 50px;
    background-color: #ff9d855e;
}

.roles h1 {
    font-size: 100px;
    color: rgba(55, 18, 90, 0.603);
    color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
    text-shadow: #91ff70;
    text-indent: 10%;
    font-family: fantasy;
    /* background-image: url('./res/bg.png'); */
}
</style>