import Page from '../components/page.js'

//TODO: Save items

export default {
  name: 'select-food',
  data() {
    return {
      foodTitle: 'New Food Item'
    }
  },
  computed: {
    title: () => 'Select Food',
    parent: function () {
      if (this.$route.query.healthy == '1')
        return '/experience/healthy'
      else if (this.$route.query.not_so_healthy == '1')
        return '/experience/not-so-healthy'
      else
        return '/experience'
    },
    icon: function () {
      if (this.$route.query.healthy == '1')
        return 'restaurant_menu'
      else if (this.$route.query.not_so_healthy == '1')
        return 'fastfood'
      else
        return 'restaurant_menu'
    }
  },
  template:
  '<page :title="title" :parent="parent">\
    <h2 class="mt-0">\
      <span class="material-icons-round accent img">{{ icon }}</span>\
      <span>{{ foodTitle }}</span>\
    </h2>\
    <p class="mb-16">\
      Below you can see the values of this item.\
      Use the button in the bottom right corner to complete the action.\
    </p>\
    <div ref="title">\
      <label for="foodTitle">Title</label>\
      <input id="foodTitle" v-model="foodTitle" class="simple-input mb-16" type="text"></input>\
    </div>\
    <div class="grid-2 gap-16 mb-16">\
      <div>\
        <label for="calories">Calories</label>\
        <input id="calories" ref="calories" class="simple-input" type="number" value="0"></input>\
      </div>\
      <div>\
        <label for="carbs">Carbs</label>\
        <input id="carbs" ref="carbs" class="simple-input" type="number" value="0"></input>\
      </div>\
      <div class="mb-16">\
        <label for="proteins">Proteins</label>\
        <input id="proteins" ref="proteins" class="simple-input" type="number" value="0"></input>\
      </div>\
      <div class="mb-16">\
        <label for="fat">Fat</label>\
        <input id="fat" ref="fat" class="simple-input" type="number" value="0"></input>\
      </div>\
      <button ref="edit" type="button" v-on:click="">Edit</button>\
      <button ref="delete" type="button" v-on:click="">Delete</button>\
    </div>\
    <div ref="fab" class="material-icons-round fab hidden">done</div>\
  </page>',
  mounted: function () {
    if (this.$route.query.item != undefined) {
      this.foodTitle = this.$route.query.item
      this.$refs.title.classList.add('hidden')
    } else {
      this.$refs.edit.classList.add('hidden')
      this.$refs.delete.classList.add('hidden')
    }
    setTimeout(() => { this.$refs.fab.classList.remove('hidden') }, 500)
  },
  components: {
      Page
  }
}
