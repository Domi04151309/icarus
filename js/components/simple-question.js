export default {
  name: 'simple-question',
  props: ['question'],
  template:
  '<div>\
    <p>{{ question }}</p>\
    <div class="button-bar">\
      <button type="button" v-on:click="">No</button>\
      <button type="button" v-on:click="">Yes</button>\
    </div>\
  </div>'

  //TODO: Add click handlers
}
