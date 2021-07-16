import JsonHelper from './json.js'

export default {
  addEntry(storageName, time, values) {
    let checkPassed = true
    values.forEach(item => {
      if (item == null || item == '' || item > 500) checkPassed = false
    })

    if (values.length != 0 && checkPassed) {
      const stored = JsonHelper.get(storageName, () => [])
      stored.unshift({
        time: time,
        values: values
      })
      JsonHelper.set(storageName, stored)
      return true
    } else {
      return false
    }
  },
  getLatestEntry(storageName) {
    const data = JsonHelper.get(storageName)
    if (data == null || data.length == 0) return null
    return data.reduce((a, b) => a.time > b.time ? a : b, 0).values.join('/')
  }
}
