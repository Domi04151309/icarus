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
      items: [],
      crossItems: []
    }
  },
  watch: {
    searchString() { this.filterList() }
  },
  computed: {
    title() {
      return this.healthy ? 'Healthy' : 'Casual'
    },
    secondaryTitle() {
      return this.healthy ? 'Healthy Food' : 'Casual Food'
    },
    type() {
      return this.healthy ? 'healthy' : 'casual'
    },
    crossType() {
      return this.healthy ? 'casual' : 'healthy'
    },
    icon() {
      return this.healthy ? 'restaurant_menu' : 'fastfood'
    },
    crossIcon() {
      return this.healthy ? 'fastfood' : 'restaurant_menu'
    },
    list() {
      return this.healthy ? FoodHelper.getHealthyFood() : FoodHelper.getCasualFood()
    },
    crossList() {
      return this.healthy ? FoodHelper.getCasualFood() : FoodHelper.getHealthyFood()
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
      <food-list-item
        v-for="(item, index) in items"
        :key="index" :link="'/nutrition/' + type + '/food-details?item=' + item.pos"
        :title="item.title"
        :icon="icon">
      </food-list-item>
    </div>
    <div v-if="searchString.length > 2">
      <h2 class="text-center">You Might Be Looking For</h2>
      <div class="grid-2 gap-16 search">
        <food-list-item
          v-for="(item, index) in crossItems"
          :key="item.title + index" :link="'/nutrition/' + crossType + '/food-details?item=' + item.pos"
          :title="item.title"
          :icon="crossIcon">
        </food-list-item>
      </div>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">add</div>
  </page>`,
  components: {
      Page,
      ProgressRing,
      FoodListItem
  },
  methods: {
    filterList() {
      this.items = this.sort(this.list)
      this.crossItems = this.sort(this.crossList).slice(0, 2)
    },
    sort(items) {
      let food = JSON.parse(JSON.stringify(items))
      food.forEach((item, i) => { item.pos = i })
      food = food.filter(a => a.title.toUpperCase().includes(this.searchString.toUpperCase()))
      food.sort((a, b) => a.title.localeCompare(b.title))
      return food
    },
    onFabClicked() {
      this.$router.push('/nutrition/' + this.type + '/food-item')
    }
  },
  created() {
    this.filterList()
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
