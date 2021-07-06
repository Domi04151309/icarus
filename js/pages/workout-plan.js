import Page from '../components/page.js'
import RangeInput from '../components/range-input.js'

import FoodHelper from '../helpers/food.js'
import ExerciseHelper from '../helpers/exercises.js'
import WorkoutHelper from '../helpers/workouts.js'

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
  `<page :title="title" parent="/account/data" class="text-center">
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
    <button type="button" v-on:click="handleClick()">Save</button>
  </page>`,
  components: {
      Page,
      RangeInput
  },
  methods: {
    handleClick() {
      localStorage.setItem('fitness', JSON.stringify(this.fitness))
      FoodHelper.generateNewScores()
      ExerciseHelper.generateNewScores()
      WorkoutHelper.generateNewScores()
      this.$router.push('/account/data')
    }
  },
  created() {
    const stored = localStorage.getItem('fitness')
    if (stored != null) this.fitness = JSON.parse(stored)
  }
}
