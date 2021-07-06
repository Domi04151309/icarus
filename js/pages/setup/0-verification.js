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
      <input ref="code" class="setup-input mb-16" type="text" placeholder="Code" autocomplete="off" v-on:keyup.enter="handleClick()">
      <p v-show="wrongCode" class="mb-8 red accent-text">Invalid code!</p>
      <div class="inline-grid-2 gap-8 mt-8">
        <button type="button" v-on:click="liteMode()">Lite Mode</button>
        <button type="button" v-on:click="verify()">Verify</button>
      </div>
    </page-no-app-bar>
  </div>`,
  components: {
      PageNoAppBar
  },
  methods: {
    liteMode() {
      localStorage.setItem('liteMode', '1')
      this.$router.push('/progress')
      if (window.unlocked) setTimeout(() => location.reload(), 500)
    },
    async verify() {
      let input = await window.encrypt(this.$refs.code.value)
      if (await window.checkVerification(input)) {
        localStorage.setItem('verification', input)
        if (localStorage.getItem('setup_complete')) this.$router.push('/progress')
        else this.$router.push('/setup/welcome')
        if (!window.unlocked) {
          localStorage.removeItem('liteMode')
          setTimeout(() => location.reload(), 500)
        }
      } else {
        this.$refs.code.value = ''
        this.wrongCode = true
      }
    }
  }
}
