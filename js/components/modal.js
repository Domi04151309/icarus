export default {
  name: 'modal',
  props: {
    title: String,
    message: String,
    positiveText: {
      type: String,
      default: 'Ok'
    },
    negativeText: {
      type: String,
      default: 'Cancel'
    },
    positiveFunction: {
      type: Function,
      default: () => {}
    },
    negativeFunction: {
      type: Function,
      default: () => {}
    }
  },
  template:
  '<div class="modal-container">\
    <div class="modal-background" v-on:click="negative()"></div>\
    <div class="modal-content card">\
      <h2>{{ title }}</h2>\
      <p>{{ message }}</p>\
      <slot></slot>\
      <div class="button-bar">\
        <button v-on:click="negative()" type="button">{{ negativeText }}</button>\
        <button v-on:click="positive()" type="button">{{ positiveText }}</button>\
      </div>\
    </div>\
  </div>',
  methods: {
    positive() {
      this.positiveFunction()
      this.$el.parentNode.removeChild(this.$el)
    },
    negative() {
      this.negativeFunction()
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
