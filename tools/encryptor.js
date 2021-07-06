import Page from '../js/components/page.js'

export default {
  name: 'encryptor',
  data() {
    return {
      title: 'Encryptor',
      input: ''
    }
  },
  template:
  `<page :title="title" parent="/tools">
    <p>This tool is for generating access keys.</p>
    <h2>Input</h2>
    <input v-model="input" type="text" autocomplete="off" class="mb-16">
    <button type="button" v-on:click="calc()">Encrypt</button>
    <h2>Output</h2>
    <pre ref="result">Input something first.</pre>
    <pre ref="result2"></pre>
  </page>`,
  components: {
    Page
  },
  methods: {
    async calc() {
      this.$refs.result.innerHTML = await this.encrypt(this.input)
      this.$refs.result2.innerHTML = await this.encrypt(await this.encrypt(this.input))
    },
    async encrypt(input) {
      return Array.from(
        new Uint8Array(
          await crypto.subtle.digest('SHA-256',new TextEncoder().encode(input))
        )
      ).map(b => b.toString(16).padStart(2, '0')).join('')
    }
  }
}
