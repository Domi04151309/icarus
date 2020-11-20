import PageTabBar from '../components/page-tab-bar.js'

export default {
  name: 'account',
  template:
  '<page-tab-bar>\
    <div class="flex">\
      <span id="profile-icon" class="material-icons-round">account_circle</span>\
      <ul class="no-bullets">\
        <li>Name</li>\
        <li class="p">Age</li>\
        <li class="p">Motivation Quota</li>\
      </ul>\
    </div>\
    <ul class="link-list card">\
      <li><router-link to="/preferences"><span class="material-icons-round">settings</span>Preferences</router-link></li>\
      <li><router-link to="/help"><span class="material-icons-round">help</span>Help</router-link></li>\
      <li><router-link to="/about"><span class="material-icons-round">info</span>About</router-link></li>\
    </ul>\
  </page-tab-bar>',
  components: {
      PageTabBar
  }
}
