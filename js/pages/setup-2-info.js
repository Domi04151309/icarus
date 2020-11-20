import PageNoAppBar from '../components/page-no-app-bar.js'

export default {
  name: 'setup-info',
  template:
  '<div>\
    <div class="setup-image info"></div>\
    <page-no-app-bar class="setup-text">\
      <h1>Your Plan</h1>\
      <p>Please enter your data so that we can generate a plan that fits you the best.</p>\
      <p style="color:red">TODO: Add data inputs</p>\
      <button type="button" v-on:click="handleClick">Continue</button>\
    </page-no-app-bar>\
  </div>',
  components: {
      PageNoAppBar
  },
  methods: {
  	handleClick: function(){
      this.$router.push('/setup/finish')
    }
  }
}
