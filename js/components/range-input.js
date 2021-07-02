export default {
  name: 'range-input',
  props: {
    title: String,
    value: Number
  },
  watch: {
    value() {
      this.$emit('input', this.value)
    }
  },
  template:
  `<div>
    <label :for="title.replace(/[^a-zA-Z]/g, '')">{{ title }}</label>
    <input :id="title.replace(/[^a-zA-Z]/g, '')" type="range" max="100" v-model.number="value">
    <div class="flex center between px-24 mt--4">
      <small class="p">Irrelevant</small>
      <small class="p">Important</small>
    </div>
  </div>`
}
