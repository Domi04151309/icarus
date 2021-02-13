import Page from '../components/page.js'

export default {
  name: 'exercise-list',
  data() {
    return {
      title: 'Exercises',
      storage: [
        { title: 'Exercise 1', dummy: 'dummy text' },
        { title: 'Exercise 2', dummy: 'dummy text' },
        { title: 'Exercise 3', dummy: 'dummy text' },
        { title: 'Exercise 4', dummy: 'dummy text' }
      ]
    }
  },
  template:
  `<page :title="title" parent="/exercises">
    <ul class="link-list ignore-page-padding">
      <li v-for="(item, index) in storage" :key="index">
        <span>
          {{ item.title }}<br>
          <span class="p">{{ item.dummy }}</span>
        </span>
      </li>
    </ul>
  </page>`,
  components: {
      Page
  }
}
