import Page from '../components/page.js'
import ProgressRing from '../components/progress-ring.js'

export default {
  name: 'new-exercise',
  computed: {
    title: () => 'Exercise'
  },
  template:
  `<page :title="title" parent="/exercises">
    <h2 class="text-center mb-32">Exercise Title</h2>
    <div class="card mb-16-p-16">
      <h2>Tutorial</h2>
      <p>
        Dummy text dummy text dummy text dummy text dummy text dummy text.
        Dummy text dummy text dummy text dummy text dummy text dummy text.
        Dummy text dummy text dummy text dummy text dummy text dummy text.
      </p>
    </div>
    <div class="card text-center mb-16-p-16">
      <h2>Timer</h2>
      <progress-ring radius="64" progress="66" stroke="8"></progress-ring>
    </div>
    <div class="card mb-16-p-16">
      <h2>Sets</h2>
      <div class="flex my-24">
        <button class="progress-control left" type="button" v-on:click="">&minus;</button>
        <progress max="100" value="33"></progress>
        <button class="progress-control right" type="button" v-on:click="">+</button>
      </div>
    </div>
    <div class="card mb-16-p-16">
      <h2>Repetitions</h2>
      <input class="simple-input" type="number" value="4" autocomplete="off"></input>
    </div>
    <div class="card mb-16-p-16">
      <h2>Information</h2>
      <p>
        Dummy text dummy text dummy text dummy text dummy text dummy text.
        Dummy text dummy text dummy text dummy text dummy text dummy text.
        Dummy text dummy text dummy text dummy text dummy text dummy text.
      </p>
    </div>
  </page>`,
  components: {
      Page,
      ProgressRing
  }
}
