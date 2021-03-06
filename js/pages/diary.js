import Page from '../components/page.js'

import DiaryHelper from '../helpers/diary.js'

export default {
  name: 'diary',
  data() {
    return {
      items: []
    }
  },
  template:
  `<page title="Diary" parent="/progress">
    <div class="diary">
      <div v-for="(date, index) in items" :key="index">
        <h2 class="h3 text-center">{{ date.title }}</h2>
        <ul class="card link-list m-0">
          <li v-for="item in date.items" :key="item.time">
            <router-link :to="'/progress/diary/entry?pos=' + item.pos">
              <div class="flex between center">
                <div>
                  {{ item.text }}<br>
                  <span class="p">{{ item.details }}</span>
                </div>
                <div class="material-icons-round big-c-icon">{{ item.icon }}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </page>`,
  components: {
    Page
  },
  created() {
    const items = DiaryHelper.getItems()
    items.forEach((item, i) => {
      item.pos = i
    })

    const array = []
    let currentDate = ''
    let currentObject = {}
    let date = null
    let dateString = ''
    items.forEach(item => {
      date = new Date(item.time)
      dateString = date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      if (currentDate != dateString) {
        currentDate = dateString
        currentObject = new Object()
        currentObject.title = dateString
        currentObject.items = new Array()
        array.push(currentObject)
      }
      item.details = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      currentObject.items.push(item)
    })
    this.items = array
  }
}
