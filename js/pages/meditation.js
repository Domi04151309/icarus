import Page from '../components/page.js'
import ProgressRing from '../components/progress-ring.js'

//TODO: Add functionality

export default {
  name: 'meditation',
  template:
  `<page title="Meditation" parent="/well-being" class="deep-purple"><div class="disabled">
    <div class="flex space center mt-16 mb-32">
      <div class="relative p-16">
        <h2 class="absolute m-0">1:00:00</h2>
        <progress-ring radius="128" :progress="100" stroke="8"></progress-ring>
      </div>
    </div>
    <div class="card flex space center text-center p-16 mb-32">
      <div>
        <h2 class="m-0">1:00:00</h2>
        <p class="mb-0">Duration</p>
      </div>
    </div>
    <div class="grid-2 gap-8 mb-8">
      <button type="button" v-on:click="">Start</button>
      <button type="button" v-on:click="">Reset</button>
    </div>
    <button class="w-100" type="button" v-on:click="">Finish</button>
  </div></page>`,
  components: {
    Page,
    ProgressRing
  }
}
