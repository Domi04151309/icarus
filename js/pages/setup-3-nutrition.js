import PageNoAppBar from '../components/page-no-app-bar.js'
import SimpleQuestion from '../components/simple-question.js'

export default {
  name: 'setup-nutrition',
  template:
  '<div>\
    <div class="setup-image info"></div>\
    <page-no-app-bar class="setup-text">\
      <h1>Nutrition</h1>\
      <p>Please enter your data so that we can generate a plan that fits you the best.</p>\
      <label for="fat_loss">Fat loss</label>\
      <input id="fat_loss" ref="fat_loss" class="mb-16" type="range" max="100">\
      <simple-question question="Do you want to eat less sweets?" class="mb-16"></simple-question>\
      <simple-question question="Do you want to drink more water?" class="mb-16"></simple-question>\
      <simple-question question="Are you vegetarian?" class="mb-16"></simple-question>\
      <simple-question question="Are you vegan?" class="mb-16"></simple-question>\
      <button type="button" v-on:click="handleClick()">Continue</button>\
    </page-no-app-bar>\
  </div>',
  components: {
      PageNoAppBar,
      SimpleQuestion
  },
  methods: {
    handleClick() {
      localStorage.setItem('info_fat_loss', this.$refs.fat_loss.value)
      this.$router.push('/setup/fitness')
    }
  }
}
