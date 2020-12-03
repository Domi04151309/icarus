export default {
  name: 'simple-question',
  props: {
    question: String
  },
  data() {
    return {
      value: undefined
    }
  },
  template:
  '<div>\
    <p>{{ question }}</p>\
    <div class="question button-bar">\
      <button ref="no" type="button" v-on:click="onNoClick()">No</button>\
      <button ref="yes" type="button" v-on:click="onYesClick()">Yes</button>\
    </div>\
  </div>',
  methods: {
    unselectButtons() {
      this.$refs.no.classList.remove('selected')
      this.$refs.yes.classList.remove('selected')
    },
    onNoClick() {
      this.unselectButtons()
      this.$refs.no.classList.add('selected')
      this.value = false
    },
    onYesClick() {
      this.unselectButtons()
      this.$refs.yes.classList.add('selected')
      this.value = true
    }
  }
}
