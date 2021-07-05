export default {
  name: 'page-tab-bar',
  data() {
    return {
      tabs: [
        {
          icon: 'insights',
          title: 'Progress',
          url: '/progress'
        },
        {
          icon: 'spa',
          title: 'Well-Being',
          url: '/well-being'
        },
        {
          icon: 'restaurant_menu',
          title: 'Nutrition',
          url: '/nutrition'
        },
        {
          icon: 'directions_run',
          title: 'Exercises',
          url: '/exercises'
        },
        {
          icon: 'account_circle',
          title: 'Account',
          url: '/account'
        }
      ]
    }
  },
  template:
  `<div>
    <header>
      <h1>{{ 'Icarus' + (window.unlocked ? '' : ' Lite') }}</h1>
    </header>
    <main class="with app-bar tab-bar fade-in-animation">
      <slot></slot>
    </main>
    <footer>
      <router-link class="tab" v-for="tab in tabs" :key="tab.url" :to="tab.url">
        <span class="material-icons-round" :aria-label="tab.title">{{ tab.icon }}</span>
      </router-link>
    </footer>
  </div>`
}
