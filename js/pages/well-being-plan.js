import Page from '../components/page.js'
import IconItem from '../components/icon-item.js'

export default {
  name: 'well-being-plan',
  template:
  `<page title="Well-Being Plan" parent="/account/data" class="text-center">
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
    <button type="button" v-on:click="handleClick()">Save</button>
  </page>`,
  components: {
    Page,
    IconItem
  },
  methods: {
    handleClick() {
      this.$router.push('/account/data')
    }
  }
}
