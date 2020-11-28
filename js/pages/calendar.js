import Page from '../components/page.js'

export default {
  name: 'calendar',
  data: function() {
    return {
      title: 'Calendar',
      month: 0,
      year: 0,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'],
      days: ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']
    }
  },
  template:
  '<page :title="title" parent="/progress" id="calendar">\
    <div class="card mb-16-p-16">\
      <h2>\
        <span id="month-title"></span>\
        <button type="button" id="prev-month">Previous</button>\
        <button type="button" id="next-month">Next</button>\
      </h2>\
      <h3>\
        <span id="year"></span>\
        <button type="button" id="prev-y">Previous</button>\
        <button type="button" id="next-y">Next</button>\
      </h3>\
    </div>\
    <div id="picker-container" class="card mb-16-p-16 text-center"></div>\
  </page>',
  components: {
      Page
  },
  methods: {
    getVal(day) {
      console.log(this.year + "/" +  (this.month + 1) + "/" + day.innerHTML)
    },
    getDays() {
      var pickerContainer = document.getElementById('picker-container')
      if (pickerContainer != null) pickerContainer.innerHTML = ''
      document.getElementById('month-title').innerHTML = this.months[this.month]
      document.getElementById('year').innerHTML = this.year

      var dayHeader = document.createElement('div')
      dayHeader.classList.add('grid-7')
      for (var i = 0; i < 7; i++) {
        var dayNode = document.createElement('div')
        dayNode.appendChild(document.createTextNode(this.days[i]))
        dayHeader.appendChild(dayNode)
      }
      pickerContainer.appendChild(dayHeader)

      var firstDay = new Date(this.year, this.month, 1)
      var lastDay = new Date(this.year, this.month + 1, 0)
      var offset = firstDay.getDay()
      var dayCount = 1
      for (var iWeek = 0; iWeek < 5; iWeek++) {
        var weekNode = document.createElement('div')
        weekNode.classList.add('grid-7')
        pickerContainer.appendChild(weekNode)
        for (var iDay = 0; iDay < 7; iDay++) {
          if (offset == 0) {
            var dayNode = document.createElement('button')
            dayNode.type = 'button'
            dayNode.addEventListener("click", function() {
              this.getVal(this)
            }.bind(this))
            dayNode.appendChild(document.createTextNode(dayCount))
            weekNode.appendChild(dayNode)
            if (dayCount >= lastDay.getDate()) {
              break
            }
            dayCount++
          } else {
            var dayNode = document.createElement('div')
            weekNode.appendChild(dayNode)
            offset--
          }
        }
      }
    }
  },
  mounted: function () {
    var date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()

    document.getElementById("next-month").addEventListener("click", function() {
      if (this.month < 11) this.month++
      else this.month = 0
      this.getDays()
    }.bind(this))

    document.getElementById("prev-month").addEventListener("click", function() {
      if (this.month > 0) this.month--
      else this.month = 11
      this.getDays()
    }.bind(this))

    document.getElementById("next-y").addEventListener("click", function() {
      this.year++
      this.getDays()
    }.bind(this))

    document.getElementById("prev-y").addEventListener("click", function() {
      this.year--
      this.getDays()
    }.bind(this))

    this.getDays()
  }
}
