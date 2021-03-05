export default {
  stringToBoolean(string) {
    if (string != null) {
      if (string.toLowerCase().trim() == 'true') return true
      else if (string.toLowerCase().trim() == 'false') return false
    }
    return null
  }
}
