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
    <div v-for="(item, i) in items" :key="i">
      <h3>{{ item.title }}</h3>
      <div class="grid-3 gap-16">
        <div v-for="image in item.images" :key="image" class="card exercise img-card">
          <img :src="image" alt="Image" loading="lazy">
        </div>
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
        images: [
          'https://source.unsplash.com/featured/?food,' + item.title,
          'https://source.unsplash.com/featured/?drink,' + item.title,
          'https://source.unsplash.com/featured/?' + item.title,
          'https://source.unsplash.com/1920x1080/?food,' + item.title,
          'https://source.unsplash.com/1920x1080/?drink,' + item.title,
          'https://source.unsplash.com/1920x1080/?' + item.title
        ]
      })
    })

    this.items = items
  }
}
