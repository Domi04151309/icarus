/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import DiaryHelper from '../helpers/diary.js'

export default {
  name: 'diary-entry',
  data() {
    return {
      title: 'Diary Entry',
      item: {}
    }
  },
  template:
  `<page :title="title" parent="/progress/diary">
    <div class="material-icons-round big">{{ item.icon }}</div>
    <h2>{{ item.title }}</h2>
    <h3>{{ new Date(item.time).toLocaleString() }}</h3>
    <p class="mb-32">{{ item.description }}</p>
    <div class="flex end">
      <button v-on:click="share()" type="button" class="flex center mr-8"><span class="material-icons-round mr-8">share</span>Share</button>
      <button v-on:click="deleteEntry()" type="button" class="flex center"><span class="material-icons-round mr-8">delete</span>Delete</button>
    </div>
  </page>`,
  components: {
      Page
  },
  methods: {
    async share() {
      var date = new Date(this.item.time)
      const shareData = {
        title: 'Diary Entry',
        text: this.item.type.replace('You', 'I') + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' on ' + date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '. Take your personal health to the next level and start tracking your fitness today with Icarus.',
        url: 'https://domi04151309.github.io/icarus/'
      }
      try {
        await navigator.share(shareData)
      } catch (e) {
        console.warn(e)
      }
    },
    deleteEntry() {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Delete Entry',
          message: 'Are you sure you want to delete this entry? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            DiaryHelper.deleteItem(this.item.time)
            setTimeout(() => { this.$router.push('/progress/diary') }, 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  created() {
    if (this.$route.query.pos != null) {
      var selectedItem = DiaryHelper.getItems()[parseInt(this.$route.query.pos, 10)]
      if (selectedItem.item != null) {
        selectedItem.title = selectedItem.item.title
        if (selectedItem.icon == 'directions_run') selectedItem.description = selectedItem.item.information[0]
        else selectedItem.description = selectedItem.item.description
      }
      if (selectedItem.title == null) {
        if (selectedItem.icon == 'directions_run') selectedItem.title = 'Unknown'
        else if (selectedItem.icon == 'restaurant_menu') selectedItem.title = 'Healthy Food'
        else if (selectedItem.icon == 'fastfood') selectedItem.title = 'Casual Food'
        else selectedItem.title = 'Unknown Item'
      }
      if (selectedItem.description == null)
        selectedItem.description = 'There is no descriptive text available for this item. You can add custom descriptive texts to food items on the nutrition page.'
      selectedItem.item = null
      this.item = selectedItem
    } else {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Entry Not Found',
          message: 'Unfortunately, this entry does not exist.',
          positiveFunction: () => {
            setTimeout(() => { this.$router.push('/progress/diary') }, 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
