import Page from '../js/components/page.js'
import ModuleRun from './extractor-exercises-mod.js'

export default {
  name: 'extractor-exercises',
  data() {
    return {
      title: 'Exercise Extractor'
    }
  },
  template:
  `<page :title="title" parent="/tools">
    <p>This tool converts CSV data to useful JSON data.</p>
    <samp id="result"></samp>
  </page>`,
  components: {
      Page
  },
  mounted() {
    ModuleRun()
  }
}
