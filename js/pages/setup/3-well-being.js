import PageNoAppBar from '../../components/page-no-app-bar.js'
import IconItem from '../../components/icon-item.js'

//TODO: Add functionality

export default {
  name: 'setup-well-being',
  template:
  `<div>
    <div class="setup-image well-being"></div>
    <page-no-app-bar class="setup-text">
      <h1>Well-Being</h1>
      <p class="mb-32">Choose the option that describes your goals the best.</p>
      <div class="disabled"><icon-item
        icon="emoji_people"
        title="Less Anxiety"
        summary="Coming soon">
      </icon-item>
      <icon-item
        icon="king_bed"
        title="Better Sleep"
        summary="Coming soon">
      </icon-item>
      <icon-item
        icon="emoji_nature"
        title="Stress Management"
        summary="Coming soon">
      </icon-item></div>
      <button type="button" v-on:click="handleClick()" class="mt-8">Continue</button>
    </page-no-app-bar>
  </div>`,
  components: {
    PageNoAppBar,
    IconItem
  },
  methods: {
    handleClick() {
      this.$router.push('/setup/nutrition')
    }
  }
}
