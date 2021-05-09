/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ProgressRing from '../../components/progress-ring.js'
import ListItemImage from '../../components/list-item-image.js'
import Modal from '../../components/modal.js'

import { ProgressCompanion, DayHelper } from '../../helpers/progress.js'

//TODO: Dynamically generate content

export default {
  name: 'well-being',
  computed: {
    sleepProgress() {
      var helper = new DayHelper()
      return (helper.progress.sleep * 100) / (ProgressCompanion.maxSleep)
    },
    meditationProgress() {
      return 100
    }
  },
  template:
  `<page-tab-bar class="deep-purple">
    <h2 class="mt-16 mx-8 secondary-title">Feel Good</h2>
    <p class="mt-0 mb-48 mx-8">It's time to care about yourself!</p>
    <router-link to="" class="card mb-16-p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="sleepProgress" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0">Sleep</h2>
        <p>Get your daily amount of sleep</p>
      </div>
    </router-link>
    <router-link to="" class="card mb-16-p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="meditationProgress" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0">Meditation</h2>
        <p>Time to find balance</p>
      </div>
    </router-link>
    <h2 class="mx-8 mt-48 mb-24">Recommendations</h2>
    <list-item-image title="Coming soon" image="./images/well-being/1.jpg"></list-item-image>
  </page-tab-bar>`,
  components: {
      PageTabBar,
      ProgressRing,
      ListItemImage
  },
  mounted() {
    if (localStorage.getItem('help_well_being') == null) {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Well-Being Page',
          message: 'This page is for caring about yourself and helping you bring a healthy balance to your life.',
          positiveFunction: () => {
            localStorage.setItem('help_well_being', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
