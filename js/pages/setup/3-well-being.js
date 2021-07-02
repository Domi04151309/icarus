import PageNoAppBar from '../../components/page-no-app-bar.js'

export default {
  name: 'setup-well-being',
  template:
  `<div>
    <div class="setup-image info"></div>
    <page-no-app-bar class="setup-text">
      <h1>Well-Being</h1>
      <p class="mb-32">Choose the plan that describes your goals the best.</p>
      <p class="mb-16">Coming soon</p>
      <button type="button" v-on:click="handleClick()">Continue</button>
    </page-no-app-bar>
  </div>`,
  components: {
      PageNoAppBar
  },
  methods: {
    handleClick() {
      this.$router.push('/setup/nutrition')
    }
  }
}
