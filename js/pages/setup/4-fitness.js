import PageNoAppBar from '../../components/page-no-app-bar.js'

export default {
  name: 'setup-fitness',
  template:
  '<div>\
    <div class="setup-image info"></div>\
    <page-no-app-bar class="setup-text">\
      <h1>Fitness Goals</h1>\
      <p class="mb-32">\
        Below you can set the importance of some factors.\
        Leave this as-is if you want a balanced workout.\
      </p>\
      <label for="muscle_gain">Muscle gain</label>\
      <input id="muscle_gain" ref="muscle_gain" class="mb-16" type="range" max="100">\
      <label for="cardio">Cardio</label>\
      <input id="cardio" ref="cardio" class="mb-16" type="range" max="100">\
      <label for="endurance">Endurance</label>\
      <input id="endurance" ref="endurance" class="mb-16" type="range" max="100">\
      <label for="arms">Arms</label>\
      <input id="arms" ref="arms" class="mb-16" type="range" max="100">\
      <label for="shoulders">Shoulders</label>\
      <input id="shoulders" ref="shoulders" class="mb-16" type="range" max="100">\
      <label for="back">Back</label>\
      <input id="back" ref="back" class="mb-16" type="range" max="100">\
      <label for="chest">Chest</label>\
      <input id="chest" ref="chest" class="mb-16" type="range" max="100">\
      <label for="abs">Abs</label>\
      <input id="abs" ref="abs" class="mb-16" type="range" max="100">\
      <label for="booty">Booty</label>\
      <input id="booty" ref="booty" class="mb-16" type="range" max="100">\
      <label for="legs">Legs</label>\
      <input id="legs" ref="legs" class="mb-16" type="range" max="100">\
      <button type="button" v-on:click="handleClick()">Continue</button>\
    </page-no-app-bar>\
  </div>',
  components: {
      PageNoAppBar
  },
  methods: {
    handleClick() {
      localStorage.setItem('info_muscle_gain', this.$refs.muscle_gain.value)
      localStorage.setItem('info_cardio', this.$refs.cardio.value)
      localStorage.setItem('info_endurance', this.$refs.endurance.value)
      localStorage.setItem('info_arms', this.$refs.arms.value)
      localStorage.setItem('info_shoulders', this.$refs.shoulders.value)
      localStorage.setItem('info_back', this.$refs.back.value)
      localStorage.setItem('info_chest', this.$refs.chest.value)
      localStorage.setItem('info_abs', this.$refs.abs.value)
      localStorage.setItem('info_booty', this.$refs.booty.value)
      localStorage.setItem('info_legs', this.$refs.legs.value)
      this.$router.push('/setup/finish')
    }
  },
  mounted() {
    this.$refs.muscle_gain.value = parseInt(localStorage.getItem('info_muscle_gain'), 10) || 50
    this.$refs.cardio.value = parseInt(localStorage.getItem('info_cardio'), 10) || 50
    this.$refs.endurance.value = parseInt(localStorage.getItem('info_endurance'), 10) || 50
    this.$refs.arms.value = parseInt(localStorage.getItem('info_arms'), 10) || 50
    this.$refs.shoulders.value = parseInt(localStorage.getItem('info_shoulders'), 10) || 50
    this.$refs.back.value = parseInt(localStorage.getItem('info_back'), 10) || 50
    this.$refs.chest.value = parseInt(localStorage.getItem('info_chest'), 10) || 50
    this.$refs.abs.value = parseInt(localStorage.getItem('info_abs'), 10) || 50
    this.$refs.booty.value = parseInt(localStorage.getItem('info_booty'), 10) || 50
    this.$refs.legs.value = parseInt(localStorage.getItem('info_legs'), 10) || 50
  }
}
