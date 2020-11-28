export default {
  name: 'modal-remove-amount',
  props: ['sKey', 'context'],
  template:
  '<div class="modal-container">\
    <div class="modal-background" v-on:click="negative()"></div>\
    <div class="modal-content card">\
      <h2>Remove Amount</h2>\
      <input ref="input" class="modal-input" type="number" value="1"></input>\
      <div class="button-bar">\
        <button v-on:click="negative()" type="button">Cancel</button>\
        <button v-on:click="positive()" type="button">Remove</button>\
      </div>\
    </div>\
  </div>',
  methods: {
    positive() {
      localStorage.setItem(this.sKey, parseInt(localStorage.getItem(this.sKey) | 0, 10) - parseInt(this.$refs.input.value, 10))
      this.context.updateProgress()
      this.$el.parentNode.removeChild(this.$el)
    },
    negative() {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
