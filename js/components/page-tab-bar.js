import AppBarNoParent from './app-bar-no-parent.js'
import TabBar from './tab-bar.js'

export default {
  name: 'page-tab-bar',
  data() {
    return {
      title: 'Icarus',
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
    <app-bar-no-parent :title="title"></app-bar-no-parent>
    <main class="with app-bar tab-bar fade-in-animation">
      <div>
        <slot></slot>
      </div>
    </main>
    <tab-bar :tabs="tabs"></tab-bar>
  </div>`,
  components: {
    AppBarNoParent,
    TabBar
  }
}
