import PageTabBar from '../../components/page-tab-bar.js'
import ExerciseItem from '../../components/exercise-item.js'

//TODO: Add functionality

export default {
  name: 'exercises',
  template:
  `<page-tab-bar>
    <div class="grid-2 gap-16">
      <exercise-item link="" title="Exercise 1" image="./images/exercises/cycling.jpg"></exercise-item>
      <exercise-item link="" title="Exercise 2" image="./images/setup/welcome.jpg"></exercise-item>
      <exercise-item link="" title="Exercise 3" image="./images/setup/info.jpg"></exercise-item>
      <exercise-item link="" title="Exercise 4" image="./images/setup/finish.jpg"></exercise-item>
    </div>
  </page-tab-bar>`,
  components: {
      PageTabBar,
      ExerciseItem
  }
}
