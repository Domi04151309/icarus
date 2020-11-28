import Page from '../components/page.js'

export default {
  name: 'about',
  data: () => {
    return {
      title: 'This Month\'s Progress'
    }
  },
  template:
  '<page :title="title" parent="/progress">\
    <div class="card mb-16-p-16">\
      <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>\
      <progress max="100" value="65"></progress>\
      <p>This is your general progress for this month. It combines your progress of the sections below.</p>\
    </div>\
    <div class="card mb-16-p-16">\
      <h2>Weekly View <span class="material-icons-round c-icon">pending_actions</span></h2>\
      <div class="flex vertical-container">\
        <progress class="vertical" max="100" value="33"></progress>\
        <progress class="vertical" max="100" value="33"></progress>\
        <progress class="vertical" max="100" value="33"></progress>\
        <progress class="vertical" max="100" value="33"></progress>\
      </div>\
      <div class="flex space">\
        <p>1</p>\
        <p>2</p>\
        <p>3</p>\
        <p>4</p>\
      </div>\
    </div>\
    <div class="card mb-16-p-16">\
      <h2>Compared to Last Month <span class="material-icons-round c-icon">sync_alt</span></h2>\
      <div class="grid-3">\
        <p class="progress-text mt-8 mb-16">Last Month</p>\
        <span></span>\
        <p class="progress-text mt-8 mb-16">This Month</p>\
        <progress class="reverse mb-16" max="100" value="33"></progress>\
        <p class="progress-text">Water</p>\
        <progress class="mb-16" max="100" value="33"></progress>\
        <progress class="reverse mb-16 indigo" max="100" value="33"></progress>\
        <p class="progress-text">Food</p>\
        <progress class="mb-16 indigo" max="100" value="33"></progress>\
        <progress class="reverse mb-16 red" max="100" value="33"></progress>\
        <p class="progress-text">Exercices</p>\
        <progress class="mb-16 red" max="100" value="33"></progress>\
        <progress class="reverse mb-16 deep-orange" max="100" value="33"></progress>\
        <p class="progress-text">Sleep</p>\
        <progress class="mb-16 deep-orange" max="100" value="33"></progress>\
      </div>\
    </div>\
  </page>',
  components: {
      Page
  }
}
