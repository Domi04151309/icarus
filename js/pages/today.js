import Page from '../components/page.js'

export default {
  name: 'today',
  data: function() {
    return {
      title: "Today\'s Progress"
    }
  },
  template:
    '<page :title="title" parent="/progress">\
      <div class="card mb-16-p-16">\
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>\
        <progress max="100" value="65"></progress>\
        <p>This is your general progress for today. It combines your progress of the sections below.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Nutrition <span class="material-icons-round c-icon">restaurant_menu</span></h2>\
        <h3>Water</h3>\
        <progress max="100" value="60"></progress>\
        <p>A small info text why this is important.</p>\
        <h3>Calories</h3>\
        <progress max="100" value="55"></progress>\
        <p>A small info text why this is important.</p>\
        <h3>Carbs</h3>\
        <progress max="100" value="50"></progress>\
        <p>A small info text why this is important.</p>\
        <h3>Proteins</h3>\
        <progress max="100" value="45"></progress>\
        <p>A small info text why this is important.</p>\
        <h3>Fat</h3>\
        <progress max="100" value="40"></progress>\
        <p>A small info text why this is important.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Workout Execises <span class="material-icons-round c-icon">fitness_center</span></h2>\
        <progress max="100" value="60"></progress>\
        <p>A small info text why this is important.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Sleep <span class="material-icons-round c-icon">hotel</span></h2>\
        <progress max="100" value="30"></progress>\
        <p>A small info text why this is important.</p>\
      </div>\
    </page>',
  components: {
    Page
  }
}
