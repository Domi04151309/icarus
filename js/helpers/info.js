import JsonHelper from './json.js'

export default {
  addEntry(storageName, time, values) {
    if (values.length != 0 && values[0] != null && values[0] != '') {
      const stored = JsonHelper.get(storageName, () => [])
      stored.unshift({
        time: time,
        values: values
      })
      JsonHelper.set(storageName, stored)
    }
  },
  getLatestEntry(storageName) {
    const data = JsonHelper.get(storageName)
    if (data == null) return null
    data.sort((a, b) => b.time - a.time)
    return data[0]?.values?.join('/') || null
  }
}
