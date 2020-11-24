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
        <h3>Water <span class="p">6/10</span></h3>\
        <div class="flex my-24">\
          <button class="progress-control left" type="button">&minus;</button>\
          <progress max="100" value="60"></progress>\
          <button class="progress-control right" type="button">+</button>\
        </div>\
        <p>It\'s healthy to drink about 3.7 litres per day. Thats about 11 and a half cups of water.</p>\
        <h3>Calories <span class="p">6/10</span></h3>\
        <div class="flex my-24 light-blue">\
          <button class="progress-control left" type="button">&minus;</button>\
          <progress max="100" value="55"></progress>\
          <button class="progress-control right" type="button">+</button>\
        </div>\
        <p>The calorie is a unit of energy defined as the amount of heat needed to raise a quantity of water by one degree of temperature.</p>\
        <h3>Carbs <span class="p">5/10</span></h3>\
        <div class="flex my-24 cyan">\
          <button class="progress-control left" type="button">&minus;</button>\
          <progress max="100" value="50"></progress>\
          <button class="progress-control right" type="button">+</button>\
        </div>\
        <p>A carbohydrate is a biomolecule consisting of carbon, hydrogen and oxygen atoms, usually with a hydrogen–oxygen atom ratio of 2:1 and thus with the empirical formula Cₘₙ</p>\
        <h3>Proteins <span class="p">5/10</span></h3>\
        <div class="flex my-24 teal">\
          <button class="progress-control left" type="button">&minus;</button>\
          <progress max="100" value="45"></progress>\
          <button class="progress-control right" type="button">+</button>\
        </div>\
        <p>Another smart text.</p>\
        <h3>Fat <span class="p">4/10</span></h3>\
        <div class="flex my-24 green">\
          <button class="progress-control left" type="button">&minus;</button>\
          <progress max="100" value="40"></progress>\
          <button class="progress-control right" type="button">+</button>\
        </div>\
        <p>A small info text why this is important.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Workout Exercises <span class="material-icons-round c-icon">fitness_center</span></h2>\
        <div class="flex my-24 light-green">\
          <button class="progress-control left" type="button">&minus;</button>\
          <progress max="100" value="60"></progress>\
          <button class="progress-control right" type="button">+</button>\
        </div>\
        <p>A workout a day keeps the doctor away.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Sleep <span class="material-icons-round c-icon">hotel</span></h2>\
        <div class="flex my-24 lime">\
          <button class="progress-control left" type="button">&minus;</button>\
          <progress max="100" value="30"></progress>\
          <button class="progress-control right" type="button">+</button>\
        </div>\
        <p>A small info text why this is important.</p>\
      </div>\
    </page>',
  components: {
    Page
  }
}
