export default {
  name: 'modal-delete-data',
  template:
  '<div class="modal-container">\
    <div class="modal-background" v-on:click="negative()"></div>\
    <div class="modal-content card">\
      <h2>Delete Data</h2>\
      <p>Are you sure you want to delete your data? This cannot be undone.</p>\
      <div class="button-bar">\
        <button v-on:click="negative()" type="button">Cancel</button>\
        <button v-on:click="positive()" type="button">Delete</button>\
      </div>\
    </div>\
  </div>',
  methods: {
    positive() {
      localStorage.clear()
      this.$el.parentNode.removeChild(this.$el)
      location.reload()
    },
    negative() {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
