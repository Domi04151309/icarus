/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ProgressRing from '../../components/progress-ring.js'
import ListItemImage from '../../components/list-item-image.js'
import Modal from '../../components/modal.js'

import { MaxProgress, DayHelper } from '../../helpers/progress.js'

//TODO: Dynamically generate content

export default {
  name: 'well-being',
  data() {
    return {
      sleep: 0,
      meditation: 0
    }
  },
  template:
  `<page-tab-bar class="deep-purple">
    <h2 class="mt-16 mx-8 secondary-title">Feel Good</h2>
    <p class="mt-0 mb-48 mx-8">It's time to care about yourself!</p>
    <router-link to="/well-being/sleep" class="card mb-16 p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="sleep" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0 mt-2">Sleep</h2>
        <p>Get your daily amount of sleep</p>
      </div>
    </router-link>
    <router-link to="/well-being/meditation" class="card mb-16 p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="meditation" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0 mt-2">Meditation</h2>
        <p>Time to find balance</p>
      </div>
    </router-link>
    <h2 class="mx-8 mt-48 mb-24">Better Sleep</h2>
    <list-item-image title="Coming soon" image="./images/well-being/2.jpg"></list-item-image>
    <h2 class="mx-8 mt-48 mb-24">Stress Management</h2>
    <list-item-image title="Coming soon" image="./images/well-being/1.jpg"></list-item-image>
  </page-tab-bar>`,
  components: {
      PageTabBar,
      ProgressRing,
      ListItemImage
  },
  created() {
    const helper = new DayHelper()
    const sleep = (helper.progress.sleep * 100) / (MaxProgress.sleep)
    const meditation = (helper.progress.meditation * 100) / (MaxProgress.meditation)
    this.sleep = sleep > 100 ? 100 : sleep
    this. meditation = meditation > 100 ? 100 : meditation
  },
  mounted() {
    if (localStorage.getItem('help_well_being') == null) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
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
