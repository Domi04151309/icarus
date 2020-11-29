import Page from '../components/page.js'

export default {
  name: 'calendar',
  data: () => {
    return {
      title: 'Calendar',
      month: 0,
      year: 0
    }
  },
  computed: {
    months: () => { return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'] },
    days: () => { return ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']}
  },
  template:
  '<page :title="title" parent="/progress" id="calendar">\
    <div class="card mb-16-p-16">\
      <h2>\
        <span id="month-title"></span>\
        <div class="controls">\
          <button type="button" id="prev-month">Previous</button>\
          <button type="button" id="next-month">Next</button>\
        </div>\
      </h2>\
      <h3>\
        <span id="year"></span>\
        <div class="controls">\
          <button type="button" id="prev-y">Previous</button>\
          <button type="button" id="next-y">Next</button>\
        </div>\
      </h3>\
    </div>\
    <div id="picker-container" class="card mb-16-p-16 text-center"></div>\
  </page>',
  components: {
      Page
  },
  methods: {
    openSelected(day) {
      this.$router.push('/progress/day?date=' + this.year + String(this.month + 1).padStart(2, '0') + String(day).padStart(2, '0'))
    },
    getDays() {
      var pickerContainer, dayHeader, dayNode, weekNode, i, j

      pickerContainer = document.getElementById('picker-container')
      pickerContainer.innerHTML = ''
      document.getElementById('month-title').innerHTML = this.months[this.month]
      document.getElementById('year').innerHTML = this.year

      dayHeader = document.createElement('div')
      dayHeader.classList.add('grid-7')
      for (i = 0; i < 7; i++) {
        dayNode = document.createElement('div')
        dayNode.appendChild(document.createTextNode(this.days[i]))
        dayHeader.appendChild(dayNode)
      }
      pickerContainer.appendChild(dayHeader)

      var firstDay = new Date(this.year, this.month, 1)
      var today = new Date()
      var lastDay = new Date(this.year, this.month + 1, 0)
      var offset = firstDay.getDay()
      var dayCount = 1
      for (i = 0; i < 6; i++) {
        weekNode = document.createElement('div')
        weekNode.classList.add('grid-7')
        pickerContainer.appendChild(weekNode)
        for (j = 0; j < 7; j++) {
          if (offset == 0) {
            if (dayCount > lastDay.getDate()) break
            dayNode = document.createElement('button')
            dayNode.type = 'button'
            dayNode.addEventListener('click', (event) => {
              this.openSelected(event.target.innerHTML)
            })
            dayNode.appendChild(document.createTextNode(dayCount))
            if (
              dayCount == today.getDate()
              && this.month == today.getMonth()
              && this.year == today.getFullYear()
            ) dayNode.classList.add('today')
            weekNode.appendChild(dayNode)
            dayCount++
          } else {
            dayNode = document.createElement('div')
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

    document.getElementById('next-month').addEventListener('click', () => {
      if (this.month < 11) this.month++
      else {
        this.year++
        this.month = 0
      }
      this.getDays()
    })

    document.getElementById('prev-month').addEventListener('click', () => {
      if (this.month > 0) this.month--
      else {
        this.year--
        this.month = 11
      }
      this.getDays()
    })

    document.getElementById('next-y').addEventListener('click', () => {
      this.year++
      this.getDays()
    })

    document.getElementById('prev-y').addEventListener('click', () => {
      this.year--
      this.getDays()
    })

    this.getDays()
  }
}
