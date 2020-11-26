<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // this.$store.state.className = window.localStorage.getItem('styleName')?window.localStorage.getItem('styleName'):'red'
  }
}
</script>

<style>
</style>
