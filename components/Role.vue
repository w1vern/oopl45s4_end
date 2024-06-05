<script setup>

const props = defineProps({
  role: {
    type: Object,
    required: true
  }
})

//const img1 = await import(props.role.picturePath)
</script>

<template>
  <div class="role">
    <div>
      <img :draggable="false" :src="props.role.picturePath"></img>
    </div>
    <div>
      <h1>{{ role.name }}</h1>
      <b>{{ role.description }}</b>
    </div>
  </div>
</template>

<style scoped>
body {
  width: 100%;
  min-height: 100vh;
  background: rgb(40, 0, 0);
  background: linear-gradient(100deg, rgba(40, 0, 0, 1) 0%, rgba(117, 0, 0, 1) 37%, rgba(111, 0, 75, 1) 69%, rgba(18, 0, 12, 1) 100%);
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
}

.header {
  text-align: center;
  border: 10px solid;
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
  /* background-image: url('./res/bg.png'); */
}

.header h2 {
  font-size: 100px;
  color: rgba(55, 18, 90, 0.603);
  color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
  text-shadow: #91ff70;
  text-indent: 10%;
  /* background-image: url('./res/bg.png'); */
}

.role img {
  /* width: 100%; */
  /* min-height: 100vh; */
  /* background: transparent; */
  /* display: flex; */
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 80%;
  margin-left: 10%;
  height: auto;
  /* box-shadow: -10px -5px 5px rgb(70, 70, 70); */
}

.role div {
  justify-content: center;
  align-items: center;
}

.role {
  /* transform: scale(.7); */
  border: 10px solid;
  border-color: rgba(55, 18, 90, 0.322);
  /* border-radius: 60px; */
  /* mix-blend-mode:normal; */
  opacity: 90%;
  padding: 5px;
  margin: 50px;
  background-color: #ff9d855e;
  display: grid;
  align-items: center;
  text-align: justify;
  color: rgba(41, 41, 41, 0.753);
  color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
  /* justify-content: right; */
  grid-template-columns: .4fr 2fr .05fr;
  column-gap: 0px;
}

.role h1 {
  font-size: 100px;
  color: rgba(41, 41, 41, 0.753);
  color: linear-gradient(280deg, rgba(55, 18, 90, 0.603) 0%, rgba(0, 197, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
  text-shadow: #91ff70;
  /* text-indent: 10%; */
}

.role b {
  font-size: 40px;
  color: rgba(255, 200, 83, 0.719);
  color: linear-gradient(280deg, rgba(255, 200, 83, 0.719) 0%, rgba(152, 0, 223, 0.527) 37%, rgba(97, 255, 83, 0.466) 69%, rgb(143, 0, 95) 100%);
  text-shadow: #91ff70;
  /* text-indent: 10%; */
}
</style>
