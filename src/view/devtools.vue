<template>
  <div class="main_app">
    <h1>chrome插件</h1>
  </div>
</template>

<script>
export default {
  name: 'devTools',
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.init()
  },
  beforeDestroy () {},
  destroyed () {},
  methods: {
    init () {}
  }
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
