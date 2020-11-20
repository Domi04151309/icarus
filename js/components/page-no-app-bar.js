export default {
  name: 'page-no-app-bar',
  template:
  '<main>\
    <transition name="fade-in">\
      <div>\
        <slot></slot>\
      </div>\
    </transition>\
  </main>'
}
