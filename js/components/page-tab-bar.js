import AppBar from './app-bar.js'
import TabBar from './tab-bar.js'

export default {
  name: 'page-tab-bar',
  data: function() {
    return {
      title: 'Icarus',
      tabs: [
        {
          icon: "directions_run",
          title: "Training",
          url: "/training"
        },
        {
          icon: "view_list",
          title: "Plan",
          url: "/plan"
        },
        {
          icon: "account_circle",
          title: "Account",
          url: "/account"
        }
      ]
    }
  },
  template:
  '<div>\
    <app-bar :title="title"></app-bar>\
    <main>\
      <transition name="fade-in">\
        <div>\
          <slot></slot>\
        </div>\
      </transition>\
    </main>\
    <tab-bar :tabs="tabs"></tab-bar>\
  </div>',
  components: {
    AppBar,
    TabBar
  }
}
