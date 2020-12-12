export default {
  getDateId(date = new Date()) {
    return date.getFullYear()
      + String(date.getMonth() + 1).padStart(2, '0')
      + String(date.getDate()).padStart(2, '0')
  },
  dateIdToDate(dateId) {
    return new Date(
      dateId.substring(0, 4), dateId.substring(4, 6) - 1, dateId.substring(6, 8)
    )
  }
}
