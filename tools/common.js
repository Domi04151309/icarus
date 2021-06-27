const log = []

export default {
  getIntFromArray(array, index) {
    const temp = parseInt(array[index], 10)
    return isNaN(temp) ? 0 : temp
  },
  getBooleanFromArray(array, index) {
    const temp = parseInt(array[index], 10)
    return temp == 0 || temp == 1
  },
  log(msg) {
    log.push(msg)
  },
  printResult(data) {
    console.log(data)
    document.getElementById('result').innerHTML = `const data = JSON.parse("${JSON.stringify(data).replaceAll('"', '\\"')}"); export default data;`
    document.getElementById('size').innerHTML = document.getElementById('result').innerHTML.length / 1000 + ' KB'
    document.getElementById('log').innerHTML = log.join('\n')
    log.length = 0
  },
  CSVtoArray(text) {
    const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/
    const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g

    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null

    const a = [] // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
        (m0, m1, m2, m3) => {

            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"))

            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'))
            else if (m3 !== undefined) a.push(m3)
            return '' // Return empty string.
        })

    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('')
    return a
  }
}
