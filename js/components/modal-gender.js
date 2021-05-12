import JsonHelper from '../helpers/json.js'

//TODO: Replace with generic modal

export default {
  name: 'modal-gender',
  template:
  `<div class="modal-container">
    <div class="modal-background" v-on:click="close()"></div>
    <div class="modal-content card">
      <h2>Change Gender</h2>
      <p>Your gender will be used to adjust goals</p>
      <div class="flex space">
        <button v-on:click="setGender('f')" type="button">Female</button>
        <button v-on:click="setGender('m')" type="button">Male</button>
        <button v-on:click="setGender('o')" type="button">Other</button>
      </div>
      <div class="button-bar">
        <button v-on:click="close()" type="button">Cancel</button>
      </div>
    </div>
  </div>`,
  methods: {
    setGender(gender) {
      const stored = JsonHelper.getData('info', () => {})
      stored.gender = gender
      localStorage.setItem('info', JSON.stringify(stored))
      this.close()
    },
    close() {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
