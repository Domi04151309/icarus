import Identifiers from './identifiers.js'
import MaxProgress from './progress-companion.js'
import JsonHelper from './json.js'

function getDefaultObject() {
  return {
    water: 0,
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    exercises: 0,
    yoga: 0,
    sleep: 0,
    meditation: 0
  }
}

function getAverageProgress(progressObj, keys) {
  return keys.reduce((acc, key) => acc + (progressObj[key] || 0) / MaxProgress[key], 0) / keys.length
}

class DayHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
    this.progress = JsonHelper.get(dateId, getDefaultObject)
  }
  saveProgress() {
    JsonHelper.set(this.dateId, this.progress)
  }
  getWellBeingProgress() {
    return getAverageProgress(this.progress, ['sleep']) + getAverageProgress(this.progress, ['meditation']) / 2
  }
  getWaterProgress() {
    return getAverageProgress(this.progress, ['water'])
  }
  getFoodProgress() {
    return getAverageProgress(this.progress, ['calories', 'fat', 'carbs', 'protein'])
  }
  getExerciseProgress() {
    return getAverageProgress(this.progress, ['exercises', 'yoga']) * 2
  }
  getProgress() {
    return (2 * this.getWellBeingProgress() + 2 * this.getWaterProgress() + 2 * this.getFoodProgress() + this.getExerciseProgress()) / 6
  }
}

class WeekHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
  }
  forDayInWeek(action) {
    const date = Identifiers.dateIdToDate(this.dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (let i = 0; i < 7; i++) {
      action(date)
      date.setDate(date.getDate() + 1)
    }
  }
  getWeeksProgress(action) {
    let progress = 0
    this.forDayInWeek(date => {
      progress += action(new DayHelper(Identifiers.getDateId(date)))
    })
    return progress / 7
  }
  getProgress() {
    return this.getWeeksProgress(helper => helper.getProgress())
  }
  getWellBeingProgress() {
    return this.getWeeksProgress(helper => helper.getWellBeingProgress())
  }
  getWaterProgress() {
    return this.getWeeksProgress(helper => helper.getWaterProgress())
  }
  getFoodProgress() {
    return this.getWeeksProgress(helper => helper.getFoodProgress())
  }
  getExerciseProgress() {
    return this.getWeeksProgress(helper => helper.getExerciseProgress())
  }
}

class MonthHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
  }
  forDayInMonth(action) {
    const date = Identifiers.dateIdToDate(this.dateId)
    const month = date.getMonth()
    let days = 0
    date.setDate(1)
    while (date.getMonth() == month) {
      action(date)
      days++
      date.setDate(date.getDate() + 1)
    }
    return days
  }
  getMonthsProgress(action) {
    let progress = 0
    const days = this.forDayInMonth(date => {
      progress += action(new DayHelper(Identifiers.getDateId(date)))
    })
    return progress / days
  }
  getProgress() {
    return this.getMonthsProgress(helper => helper.getProgress())
  }
  getWellBeingProgress() {
    return this.getMonthsProgress(helper => helper.getWellBeingProgress())
  }
  getWaterProgress() {
    return this.getMonthsProgress(helper => helper.getWaterProgress())
  }
  getFoodProgress() {
    return this.getMonthsProgress(helper => helper.getFoodProgress())
  }
  getExerciseProgress() {
    return this.getMonthsProgress(helper => helper.getExerciseProgress())
  }
}

const Achievement = {
  show(message = '') {
    navigator.vibrate(1)

    const node = document.createElement('div')
    node.classList.add('card', 'achievement', 'normal')

    const icon = document.createElement('span')
    icon.classList.add('material-icons-round')
    icon.appendChild(document.createTextNode('emoji_events'))

    node.appendChild(icon)
    node.appendChild(document.createTextNode(message))
    document.body.appendChild(node)

    setTimeout(() => {
      node.classList.remove('normal')
    }, 1000)
    setTimeout(() => {
      node.classList.add('reverse')
    }, 5000)
    setTimeout(() => {
      node.remove()
    }, 6000)
  }
}

export {
  MaxProgress, DayHelper, WeekHelper, MonthHelper, Achievement
}
