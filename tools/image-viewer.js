import Page from '../js/components/page.js'

import Food from '../js/data/food.js'

export default {
  name: 'image-viewer',
  data() {
    return {
      title: 'Image Viewer',
      items: [],
      missingItems: []
    }
  },
  template:
  `<page :title="title" parent="/tools">
    <p>This tool gets images from Unsplash.
    <h2>Missing</h2>
    <ul>
      <li v-for="item in missingItems" :key="item">{{ item }}</li>
    </ul>
    <h2>Nutrition</h2>
    <div v-for="(item, i) in items" :key="i" class="ignore-page-padding">
      <h2 ref="largeTitle" class="large-app-bar" :style="'background: var(--background-dim), url(' + item.image + ') no-repeat center'">{{ item.title }}</h2>
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
      if (item.image != '') {
        items.push({
          title: item.title,
          image: 'https://source.unsplash.com/' + item.image
        })
      }
      else this.missingItems.push(item.title)
    })

    this.items = items
  }
}
