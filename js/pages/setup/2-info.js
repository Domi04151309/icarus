import PageNoAppBar from '../../components/page-no-app-bar.js'

export default {
  name: 'setup-info',
  data() {
    return {
      info: {
        name: null,
        age: null,
        gender: '',
        weight: null
      }
    }
  },
  template:
  `<div>
    <div class="setup-image info"></div>
    <page-no-app-bar class="setup-text">
      <h1>Personal Data</h1>
      <p class="mb-32">Please tell us a little bit about yourself.</p>
      <input v-model="info.name" class="setup-input mb-16" type="text" placeholder="Name" autocomplete="off">
      <input v-model="info.age" class="setup-input mb-16" type="number" placeholder="Age" autocomplete="off">
      <select class="setup-input mb-16" v-model="info.gender">
        <option disabled value="">Please select a gender</option>
        <option value="f">Female</option>
        <option value="m">Male</option>
        <option value="o">Other</option>
      </select>
      <input v-model="info.weight" class="setup-input mb-16" type="number" placeholder="Weight" autocomplete="off">
      <button type="button" v-on:click="handleClick()">Continue</button>
    </page-no-app-bar>
  </div>`,
  components: {
      PageNoAppBar
  },
  methods: {
    handleClick() {
      localStorage.setItem('info', JSON.stringify(this.info))
      this.$router.push('/setup/nutrition')
    }
  },
  created() {
    const stored = localStorage.getItem('info')
    if (stored != null) this.info = JSON.parse(stored)
  }
}
