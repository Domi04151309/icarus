export default {
  name: 'page-large-app-bar',
  props: {
    title: String,
    parent: String,
    imgId: {
      type: String,
      default: ''
    }
  },
  computed: {
    img() {
      return 'https://source.unsplash.com/' + this.imgId
    }
  },
  template:
  `<div class="large-app-bar">
    <header>
      <router-link :to="parent">
        <span class="material-icons-round transparent nav-icon" aria-label="Back">arrow_back</span>
      </router-link>
    </header>
    <h2 ref="largeTitle" class="large-app-bar">{{ title }}</h2>
    <main class="large-app-bar zoom-in-animation">
      <slot></slot>
    </main>
  </div>`,
  created() {
    if (this.imgId != '') {
      const img = new Image()
      img.src = this.img
    }
  },
  mounted() {
    if (this.imgId != '') this.$refs.largeTitle.style.background  = 'var(--background-dim), url(' + this.img + ') no-repeat center'
    console.log(this.img)
  }
}
