export default {
  get(key, fallback = () => null) {
    const stored = localStorage.getItem(key)
    if (stored == null) return fallback()
    else return JSON.parse(stored)
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
