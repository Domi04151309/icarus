export default {
  name: 'simple-question',
  props: {
    question: String,
    value: Boolean
  },
  watch: {
    value() {
      this.$emit('input', this.value)
    }
  },
  template:
  `<div>
    <p>{{ question }}</p>
    <div class="question button-bar">
      <button ref="no" type="button" :class="{ 'selected' : !value }" v-on:click="value = false">No</button>
      <button ref="yes" type="button" :class="{ 'selected' : value }" v-on:click="value = true">Yes</button>
    </div>
  </div>`
}
