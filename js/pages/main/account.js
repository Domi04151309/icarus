import PageTabBar from '../../components/page-tab-bar.js'

export default {
  name: 'account',
  template:
  '<page-tab-bar>\
    <div class="flex mb-16">\
      <span id="profile-icon" class="material-icons-round">account_circle</span>\
      <ul class="no-bullets p">\
        <li class="flex mb-8">\
          <div class="mr-16">\
            <small class="item-caption">Name</small><span ref="name">...</span>\
          </div>\
          <div>\
            <small class="item-caption">Age</small><span ref="age">...</span>\
          </div>\
        </li>\
        <li>\
          <small class="item-caption">Motivation Quota</small><span ref="mq">...</span>\
        </li>\
      </ul>\
    </div>\
    <ul class="link-list card">\
      <li><router-link to="/account/preferences"><span class="material-icons-round">settings</span>Preferences</router-link></li>\
      <li><router-link to="/account/data"><span class="material-icons-round">data_usage</span>Your Data</router-link></li>\
      <li><router-link to="/account/help"><span class="material-icons-round">help</span>Help</router-link></li>\
      <li><router-link to="/account/about"><span class="material-icons-round">info</span>About</router-link></li>\
    </ul>\
  </page-tab-bar>',
  components: {
      PageTabBar
  },
  mounted() {
    this.$refs.name.innerHTML = localStorage.getItem('info_name') || 'undefined'
    this.$refs.age.innerHTML = localStorage.getItem('info_age') || 'undefined'
    this.$refs.mq.innerHTML = localStorage.getItem('info_mq') || 'undefined'
  }
}
