import PageNoAppBar from '../components/page-no-app-bar.js'

export default {
  name: 'setup-welcome',
  template:
  '<div>\
    <div class="setup-image welcome"></div>\
    <page-no-app-bar class="setup-text">\
      <h1>Welcome to Icarus</h1>\
      <p>The easy to use fitness app that chooses the best plan for you.</p>\
      <button type="button" v-on:click="handleClick">Continue</button>\
    </page-no-app-bar>\
  </div>',
  components: {
      PageNoAppBar
  },
  methods: {
  	handleClick: () => {
      this.$router.push('/setup/info')
    }
  }
}
