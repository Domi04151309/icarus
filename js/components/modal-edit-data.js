export default {
  name: 'modal-edit-data',
  props: ['title', 'sKey', 'sType'],
  template:
  '<div class="modal-container">\
    <div class="modal-background" v-on:click="negative()"></div>\
    <div class="modal-content card">\
      <h2>{{ title }}</h2>\
      <input ref="input" class="modal-input" :type="sType"></input>\
      <div class="button-bar">\
        <button v-on:click="negative()" type="button">Cancel</button>\
        <button v-on:click="positive()" type="button">Save</button>\
      </div>\
    </div>\
  </div>',
  methods: {
    positive() {
      localStorage.setItem(this.sKey, this.$refs.input.value)
      this.$el.parentNode.removeChild(this.$el)
    },
    negative() {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  mounted: function () {
    this.$refs.input.value = localStorage.getItem(this.sKey)
  }
}
