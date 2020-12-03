import AppBarNoParent from './app-bar-no-parent.js'
import TabBar from './tab-bar.js'

export default {
  name: 'page-tab-bar',
  data() {
    return {
      title: 'Icarus',
      tabs: [
        {
          icon: 'view_list',
          title: 'Progress',
          url: '/progress'
        },
        {
          icon: 'directions_run',
          title: 'Exercises',
          url: '/exercises'
        },
        {
          icon: 'local_dining',
          title: 'Experience',
          url: '/experience'
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
  '<div>\
    <app-bar-no-parent :title="title"></app-bar-no-parent>\
    <main class="with app-bar tab-bar">\
      <transition name="fade-in">\
        <div>\
          <slot></slot>\
        </div>\
      </transition>\
    </main>\
    <tab-bar :tabs="tabs"></tab-bar>\
  </div>',
  components: {
    AppBarNoParent,
    TabBar
  }
}
