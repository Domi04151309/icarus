import Page from '../js/components/page.js'

import Food from '../js/data/food.js'

export default {
  name: 'image-grabber',
  data() {
    return {
      title: 'Image Grabber',
      items: []
    }
  },
  template:
  `<page :title="title" parent="/tools">
    <p>This tool gets images from Unsplash.
    <h2>Controls</h2>
    <button type="button" v-on:click="$router.go()">Refresh</button>
    <h2>Nutrition</h2>
    <div class="grid-1-3 gap-16 mb-16">
      <div v-for="(item, i) in items":key="i" class="card exercise img-card">
        <img :src="item.image" alt="preview image" loading="lazy">
        <h2 class="m-0 p-16">{{ item.title }}</h2>
      </div>
    </div>
  </page>`,
  components: {
      Page
  },
  created() {
    const items = []

    const food = JSON.parse(JSON.stringify(Food))
    const array = food.healthy.concat(food.casual)
    array.sort((a, b) => a.title.localeCompare(b.title))
    array.forEach(item => {
      items.push({
        title: item.title,
        image: 'https://source.unsplash.com/featured/?food,' + item.title
      })
    })

    this.items = items
  }
}
