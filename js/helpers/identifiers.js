export default {
  getDateId() {
    var today = new Date()
    return today.getFullYear()
      + String(today.getMonth() + 1).padStart(2, '0')
      + String(today.getDate()).padStart(2, '0')
  }
}