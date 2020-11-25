export default {
  name: 'modal-add-amount',
  props: ['sKey'],
  template:
  '<div class="modal-container">\
    <div class="modal-background" v-on:click="negative()"></div>\
    <div class="modal-content card">\
      <h2>Add Amount</h2>\
      <input ref="input" class="modal-input" type="number" value="1"></input>\
      <div class="button-bar">\
        <button v-on:click="negative()" type="button">Cancel</button>\
        <button v-on:click="positive()" type="button">Add</button>\
      </div>\
    </div>\
  </div>',
  methods: {
    positive() {
      //Add amount to value
      this.$el.parentNode.removeChild(this.$el)
    },
    negative() {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
