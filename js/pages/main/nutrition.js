/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ProgressRing from '../../components/progress-ring.js'
import ListItemImage from '../../components/list-item-image.js'
import IconItem from '../../components/icon-item.js'
import Modal from '../../components/modal.js'

import FoodHelper from '../../helpers/food.js'

export default {
  name: 'nutrition',
  data() {
    return {
      recommended: FoodHelper.getRecommended()
    }
  },
  computed: {
    healthyProgress() {
      const statistics = FoodHelper.getFoodStatistics()
      return (statistics.healthy.length * 100) / (statistics.healthy.length + statistics.casual.length)
    },
    casualProgress() {
      const statistics = FoodHelper.getFoodStatistics()
      return (statistics.casual.length * 100) / (statistics.healthy.length + statistics.casual.length)
    }
  },
  template:
  `<page-tab-bar class="green">
    <h2 class="mt-16 mx-8 secondary-title">Plan Your Meals</h2>
    <p class="mt-0 mb-48 mx-8">It's time to eat something delicious!</p>
    <router-link to="/nutrition/healthy" class="card mb-16 p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="healthyProgress" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0 mt-2">Healthy Food</h2>
        <p>Food that's good for you</p>
      </div>
    </router-link>
    <router-link to="/nutrition/casual" class="card mb-16 p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="casualProgress" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0 mt-2">Casual Food</h2>
        <p>Food that's delicious</p>
      </div>
    </router-link>
    <h2 class="mx-8 mt-48 mb-24">What You Could Eat</h2>
    <div v-if="window.unlocked" class="grid-1-3 gap-16">
      <list-item-image
        v-for="item in recommended"
        :key="item.title"
        :title="item.title"
        :image="item.image"
        :link="item.link">
      </list-item-image>
      <list-item-image title="Show more" image="./images/food/dinner.jpg" link="/nutrition/recommendations"></list-item-image>
    </div>
    <div v-else class="card lite nutrition">
      Get custom nutrition suggestions with the full version of Icarus
    </div>
    <h2 class="mx-8 mt-48 mb-24">Manage Your Menu</h2>
    <icon-item
      icon="sync"
      title="Updates"
      summary="Check for new items"
      link="/nutrition/update">
    </icon-item>
    <icon-item
      icon="restart_alt"
      title="Reset Local List"
      summary="Reset your local edits to the list"
      v-on:click.native="reset()">
    </icon-item>
  </page-tab-bar>`,
  components: {
    PageTabBar,
    ProgressRing,
    ListItemImage,
    IconItem
  },
  methods: {
    reset() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Reset Local List',
          message: 'Are you sure you want to reset your local edits to the list? This cannot be undone.',
          positiveText: 'Reset',
          positiveFunction: () => {
            localStorage.removeItem('healthy-food')
            localStorage.removeItem('casual-food')
            FoodHelper.generateNewScores()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  mounted() {
    if (localStorage.getItem('help_nutrition') == null) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Nutrition Page',
          message: 'Use this page to track your eating habits and for getting new recommendations every day. Collect points by eating something healthy.',
          positiveFunction: () => {
            localStorage.setItem('help_nutrition', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
