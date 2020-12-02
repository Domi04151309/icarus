import PageNoAppBar from '../components/page-no-app-bar.js'

export default {
  name: 'setup-info',
  template:
  '<div>\
    <div class="setup-image info"></div>\
    <page-no-app-bar class="setup-text">\
      <h1>Personal Data</h1>\
      <p>Please enter your data so that we can generate a plan that fits you the best.</p>\
      <input ref="name" class="mb-16" type="text" placeholder="Name" autocomplete="off">\
      <input ref="age" class="mb-16" type="number" placeholder="Age" autocomplete="off">\
      <button type="button" v-on:click="handleClick()">Continue</button>\
    </page-no-app-bar>\
  </div>',
  components: {
      PageNoAppBar
  },
  methods: {
    handleClick() {
      localStorage.setItem('info_name', this.$refs.name.value)
      localStorage.setItem('info_age', this.$refs.age.value)
      this.$router.push('/setup/nutrition')
    }
  }
}
