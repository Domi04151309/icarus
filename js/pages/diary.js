import Page from '../components/page.js'

import DiaryHelper from '../helpers/diary.js'

export default {
  name: 'diary',
  data() {
    return {
      title: 'Diary',
      items: []
    }
  },
  template:
  `<page :title="title" parent="/progress">
    <div v-for="(date, index) in items" :key="index">
      <h2 class="text-center">{{ date.title }}</h2>
      <ul class="card link-list m-0">
        <li v-for="item in date.items" :key="item.time">
          <router-link :to="'/progress/diary/entry?pos=' + item.pos">
            <div class="flex between center">
              <div>
                {{ item.type }}<br>
                <span class="p">{{ item.details }}</span>
              </div>
              <div class="material-icons-round big-c-icon">{{ item.icon }}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </page>`,
  components: {
      Page
  },
  created() {
    var items = DiaryHelper.getItems()
    items.forEach((item, i) => {
      item.pos = i
    })

    var array = []
    var currentDate = ''
    var currentObject = {}
    var date = null
    var dateString = ''
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
