import PageNoAppBar from '../components/page-no-app-bar.js'

export default {
  name: 'setup-finish',
  template:
  '<div>\
    <div class="setup-image finish"></div>\
    <page-no-app-bar class="setup-text">\
      <h1>That\'s it</h1>\
      <p>Thanks for entering your data. We will now generte a unique plan for you.</p>\
      <button type="button" v-on:click="handleClick">Finish</button>\
    </page-no-app-bar>\
  </div>',
  components: {
      PageNoAppBar
  },
  methods: {
  	handleClick: function(){
      localStorage.setItem('setup_complete', true);
      this.$router.push('/training')
    }
  }
}
