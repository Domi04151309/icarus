import PageNoAppBar from '../../components/page-no-app-bar.js'
import RangeInput from '../../components/range-input.js'

import FoodHelper from '../../helpers/food.js'
import ExerciseHelper from '../../helpers/exercises.js'

export default {
  name: 'setup-fitness',
  data() {
    return {
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
  `<div>
    <div class="setup-image fitness"></div>
    <page-no-app-bar class="setup-text">
      <h1>Fitness Goals</h1>
      <p class="mb-32">
        Below you can set the importance of some factors.
        Leave this as-is if you want a balanced workout.
      </p>
      <range-input title="Muscle gain" class="mb-16" v-model.number="fitness.muscleGain"></range-input>
      <range-input title="Cardio" class="mb-16" v-model.number="fitness.cardio"></range-input>
      <range-input title="Endurance" class="mb-16" v-model.number="fitness.endurance"></range-input>
      <range-input title="Arms" class="mb-16" v-model.number="fitness.arms"></range-input>
      <range-input title="Shoulders" class="mb-16" v-model.number="fitness.shoulders"></range-input>
      <range-input title="Back" class="mb-16" v-model.number="fitness.back"></range-input>
      <range-input title="Chest" class="mb-16" v-model.number="fitness.chest"></range-input>
      <range-input title="Abs" class="mb-16" v-model.number="fitness.abs"></range-input>
      <range-input title="Booty" class="mb-16" v-model.number="fitness.booty"></range-input>
      <range-input title="Legs" class="mb-16" v-model.number="fitness.legs"></range-input>
      <button type="button" v-on:click="handleClick()" class="mt-8">Continue</button>
    </page-no-app-bar>
  </div>`,
  components: {
      PageNoAppBar,
      RangeInput
  },
  methods: {
    handleClick() {
      localStorage.setItem('fitness', JSON.stringify(this.fitness))
      FoodHelper.generateNewScores()
      ExerciseHelper.generateNewScores()
      this.$router.push('/setup/finish')
    }
  },
  created() {
    const stored = localStorage.getItem('fitness')
    if (stored != null) this.fitness = JSON.parse(stored)
  }
}
