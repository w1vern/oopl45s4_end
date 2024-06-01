<script>
export default {
  props: {
    role: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div backgroundImage: role.picturePath>
    <!-- <img :src=role.picturePath height="150" width="150" margin="50"></img> -->
    <h1>{{ role.name }}</h1>
    <b>{{ role.description }}</b>
  </div>
</template>

<style scoped>
img {
  /* width: 100%; */
  /* min-height: 100vh; */
  background: transparent;
  /* display: flex; */
  justify-content: left;
  align-items: center;
}
div {
  text-align: center;
  border: 10px outset;
  border-color: rgba(55, 18, 90, 0.322);
  /* border-radius: 60px; */
  /* mix-blend-mode:normal; */
  opacity: 90%;
  padding: 5px;
  margin: 50px;
  background-color: #ff9d855e;
  justify-content: right;
}
h1 {
  font-size: 100px;
  color: rgba(41, 41, 41, 0.753);
  color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
  text-shadow: #91ff70;
  text-indent: 10%;
  font-family: fantasy;
  justify-content: left;
  /* background-image: url('./res/bg.png'); */
}
b {
  font-size: 40px;
  color: rgba(83, 85, 255, 0.842);
  color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
  text-shadow: #91ff70;
  text-indent: 10%;
  font-family: fantasy;
  justify-content: left;
}
</style>
