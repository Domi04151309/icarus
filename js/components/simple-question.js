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
  watch: {
    value() {
      this.$refs.no.classList.remove('selected')
      this.$refs.yes.classList.remove('selected')
      if (this.value === true) this.$refs.yes.classList.add('selected')
      else if (this.value === false) this.$refs.no.classList.add('selected')
    }
  },
  template:
  `<div>
    <p>{{ question }}</p>
    <div class="question button-bar">
      <button ref="no" type="button" v-on:click="value = false">No</button>
      <button ref="yes" type="button" v-on:click="value = true">Yes</button>
    </div>
  </div>`
}
