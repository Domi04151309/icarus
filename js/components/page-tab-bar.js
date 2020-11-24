import AppBarNoParent from './app-bar-no-parent.js'
import TabBar from './tab-bar.js'

export default {
  name: 'page-tab-bar',
  data: function() {
    return {
      title: 'Icarus',
      tabs: [
        {
          icon: "directions_run",
          title: "Progress",
          url: "/progress"
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
  },
  mounted: function () {
    const header = document.getElementsByTagName('HEADER')
    var i

    document.addEventListener('scroll', function () {
      for (i = 0; i < header.length; i++) {
        header[i].classList.toggle('header-shadow', window.pageYOffset > 0)
      }
    }.bind(this))
  }
}
