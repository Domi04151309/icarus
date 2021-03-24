import PageTabBar from '../../components/page-tab-bar.js'

import LevelHelper from '../../helpers/level.js'

export default {
  name: 'account',
  computed: {
    name: () => localStorage.getItem('info_name') || 'Guest',
    age: () => localStorage.getItem('info_age') || '0',
    mq: () => LevelHelper.getMotivationQuota() || '0'
  },
  template:
  `<page-tab-bar>
    <div class="flex mb-16">
      <span id="profile-icon" class="material-icons-round">account_circle</span>
      <ul class="no-bullets p">
        <li class="flex mb-8">
          <div class="mr-16">
            <small class="item-caption">Name</small>{{ name }}</span>
          </div>
          <div>
            <small class="item-caption">Age</small>{{ age }}</span>
          </div>
        </li>
        <li>
          <small class="item-caption">Motivation Quota</small>{{ mq }}</span>
        </li>
      </ul>
    </div>
    <ul class="link-list card">
      <li><router-link to="/account/app"><span class="material-icons-round">settings</span>App Settings</router-link></li>
      <li><router-link to="/account/data"><span class="material-icons-round">data_usage</span>Data Settings</router-link></li>
      <li><router-link to="/account/backup-and-restore"><span class="material-icons-round">settings_backup_restore</span>Backup And Restore</router-link></li>
      <li><router-link to="/account/help"><span class="material-icons-round">help</span>Help</router-link></li>
      <li><router-link to="/account/about"><span class="material-icons-round">info</span>About</router-link></li>
    </ul>
  </page-tab-bar>`,
  components: {
      PageTabBar
  }
}
