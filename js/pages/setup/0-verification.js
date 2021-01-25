import PageNoAppBar from '../../components/page-no-app-bar.js'

export default {
  name: 'setup-verification',
  data() {
    return {
      wrongCode: false
    }
  },
  template:
  `<div>
    <div class="setup-image welcome"></div>
    <page-no-app-bar class="setup-text">
      <h1>Verification</h1>
      <p class="mb-32">Please enter your personal verification code below.</p>
      <input ref="code" class="setup-input mb-16" type="text" placeholder="Code" autocomplete="off">
      <p v-show="wrongCode" class="mb-8 red accent-text">Invalid code!</p>
      <button type="button" v-on:click="handleClick()">Verify</button>
    </page-no-app-bar>
  </div>`,
  components: {
      PageNoAppBar
  },
  methods: {
    async handleClick() {
      if (await window.checkVerification(this.$refs.code.value)) {
        localStorage.setItem('verification', this.$refs.code.value)
        if (localStorage.getItem('setup_complete')) this.$router.push('/progress')
        else this.$router.push('/setup/welcome')
      } else {
        this.$refs.code.value = ''
        this.wrongCode = true
      }
    }
  }
}
