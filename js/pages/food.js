import Page from '../components/page.js'
import ProgressRing from '../components/progress-ring.js'
import FoodListItem from '../components/food-list-item.js'

import FoodHelper from '../helpers/food.js'

export default {
  name: 'food',
  props: {
    healthy: Boolean
  },
  data() {
    return {
      searchString: '',
      items: []
    }
  },
  watch: {
    searchString() { this.sort() }
  },
  computed: {
    writtenType() {
      return this.healthy ? 'healthy' : 'casual'
    },
    title() {
      return this.healthy ? 'Healthy' : 'Casual'
    },
    secondaryTitle() {
      return this.healthy ? 'Healthy Food' : 'Casual Food'
    },
    icon() {
      return this.healthy ? 'restaurant_menu' : 'fastfood'
    },
    defaultItems() {
      return this.healthy ? FoodHelper.getHealthyFood() : FoodHelper.getCasualFood()
    },
    progress() {
      const statistics = FoodHelper.getFoodStatistics()
      return this.healthy
        ? (statistics.healthy.length * 100) / (statistics.healthy.length + statistics.casual.length)
        : (statistics.casual.length * 100) / (statistics.healthy.length + statistics.casual.length)
    }
  },
  template:
  `<page :title="title" parent="/nutrition" class="green">
    <div class="text-center">
      <div class="p-16">
        <progress-ring radius="48" :progress="progress" stroke="8"></progress-ring>
      </div>
      <h2>{{ secondaryTitle }}</h2>
    </div>
    <input v-model="searchString" class="card mb-16" type="text" placeholder="Search" autocomplete="off">
    <div class="grid-2 gap-16 search">
      <food-list-item v-for="(item, index) in items" :key="index" :link="'/nutrition/' + writtenType + '/food-details?item=' + item.pos" :title="item.title" :icon="icon"></food-list-item>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">add</div>
  </page>`,
  components: {
      Page,
      ProgressRing,
      FoodListItem
  },
  methods: {
    sort() {
      let food = JSON.parse(JSON.stringify(this.defaultItems))
      food.forEach((item, i) => { item.pos = i })
      food = food.filter(a => a.title.toUpperCase().includes(this.searchString.toUpperCase()))
      food.sort((a, b) => a.title.localeCompare(b.title))
      this.items = food
    },
    onFabClicked() {
      this.$router.push('/nutrition/' + this.writtenType + '/food-item')
    }
  },
  created() {
    this.sort()
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
