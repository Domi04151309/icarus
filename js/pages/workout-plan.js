import Page from '../components/page.js'

import ExercisesHelper from '../helpers/exercises.js'

export default {
  name: 'workout-plan',
  data() {
    return {
      title: 'Workout Plan',
      fitness: {
        muscleGain: 50,
        cardio: 50,
        endurance: 50,
        arms: 50,
        shoulders: 50,
        back: 50,
        chest: 50,
        abs: 50,
        booty: 50,
        legs: 50
      }
    }
  },
  template:
  `<page :title="title" parent="/account" class="text-center">
    <label for="muscle_gain">Muscle gain</label>
    <input id="muscle_gain" class="mb-16" type="range" max="100" v-model="fitness.muscleGain">
    <label for="cardio">Cardio</label>
    <input id="cardio" class="mb-16" type="range" max="100" v-model="fitness.cardio">
    <label for="endurance">Endurance</label>
    <input id="endurance" class="mb-16" type="range" max="100" v-model="fitness.endurance">
    <label for="arms">Arms</label>
    <input id="arms" class="mb-16" type="range" max="100" v-model="fitness.arms">
    <label for="shoulders">Shoulders</label>
    <input id="shoulders" class="mb-16" type="range" max="100" v-model="fitness.shoulders">
    <label for="back">Back</label>
    <input id="back" class="mb-16" type="range" max="100" v-model="fitness.back">
    <label for="chest">Chest</label>
    <input id="chest" class="mb-16" type="range" max="100" v-model="fitness.chest">
    <label for="abs">Abs</label>
    <input id="abs" class="mb-16" type="range" max="100" v-model="fitness.abs">
    <label for="booty">Booty</label>
    <input id="booty" class="mb-16" type="range" max="100" v-model="fitness.booty">
    <label for="legs">Legs</label>
    <input id="legs" class="mb-16" type="range" max="100" v-model="fitness.legs">
    <button type="button" v-on:click="handleClick()">Save</button>
  </page>`,
  components: {
      Page
  },
  methods: {
    handleClick() {
      localStorage.setItem('fitness', JSON.stringify(this.fitness))
      ExercisesHelper.generateNewScores()
      this.$router.push('/account')
    }
  },
  mounted() {
    var stored = localStorage.getItem('fitness')
    if (stored != null) this.fitness = JSON.parse(stored)
  }
}
