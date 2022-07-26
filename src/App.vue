<template>
  <div>
    <div class="container my-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
//import router from './router'
export default {
  name: 'App'
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>