export default {
  getData(key, fallback = () => null) {
    const stored = localStorage.getItem(key)
    if (stored == null) return fallback()
    else return JSON.parse(stored)
  }
}
