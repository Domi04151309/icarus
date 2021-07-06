import PageTabBar from '../../components/page-tab-bar.js'

import LevelHelper from '../../helpers/level.js'

export default {
  name: 'account',
  data() {
    return {
      info: { }
    }
  },
  computed: {
    levelData: () => LevelHelper.getLevelData()
  },
  template:
  `<page-tab-bar>
    <div :class="'flex mb-32' + (window.unlocked ? '' : ' space')">
      <span id="profile-icon" class="material-icons-round accent">account_circle</span>
      <div v-if="window.unlocked" class="p w-100 ml-32 mr-16">
        <div class="flex">
          <div class="mr-16">
            <small class="item-caption">Name</small>{{ info.name || 'Guest' }}
          </div>
          <div class="mr-16">
            <small class="item-caption">Age</small>{{ info.age || 0 }}
          </div>
          <div>
            <small class="item-caption">Weight</small>{{ info.weight || 0 }}
          </div>
        </div>
        <progress :max="levelData.neededSectionExp" :value="levelData.sectionExp"></progress>
        <div class="flex between">
          <small class="item-caption">Level {{ levelData.level }}</small>
          <small class="item-caption mr-4">{{ levelData.sectionExp }}/{{ levelData.neededSectionExp }} points</small>
        </div>
      </div>
    </div>
    <ul class="link-list card">
      <li><router-link to="/account/app"><span class="material-icons-round">settings</span>App Settings</router-link></li>
      <li v-if="!window.unlocked"><router-link to="/setup/verification"><span class="material-icons-round">vpn_key</span>Unlock Paid Features</router-link></li>
      <li v-if="window.unlocked"><router-link to="/account/data"><span class="material-icons-round">data_usage</span>Data Settings</router-link></li>
      <li v-if="window.unlocked"><router-link to="/account/backup-and-restore"><span class="material-icons-round">settings_backup_restore</span>Backup And Restore</router-link></li>
      <li><router-link to="/tools"><span class="material-icons-round">api</span>Developer Tools</router-link></li>
      <li><router-link to="/account/help"><span class="material-icons-round">help</span>Help</router-link></li>
      <li><router-link to="/account/about"><span class="material-icons-round">info</span>About</router-link></li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  },
  created() {
    const stored = localStorage.getItem('info')
    if (stored != null) this.info = JSON.parse(stored)
  }
}
