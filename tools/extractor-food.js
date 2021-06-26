import Common from './common.js'

const COLUMN_TITLE = 0
const COLUMN_CALORIES = 1
const COLUMN_FAT = 2
const COLUMN_CARBS = 3
const COLUMN_PROTEIN = 4
const COLUMN_SUGAR = 5
const COLUMN_ALCOHOL = 6
const COLUMN_PORTION = 7
const COLUMN_SERVING = 8
const COLUMN_UNIT = 9
const COLUMN_VEGETARIAN = 10
const COLUMN_VEGAN = 11
const COLUMN_HEALTHY = 12
const COLUMN_CASUAL = 13

const FILE_PATH = './Icarus%20Data%20-%20Nutrition.csv'
const IGNORE_LINES = []
const LAST_LINE = 231

let currentLine = 0
const failingLines = []

function addItemToArray(array, line) {
  array.push({
    title: line[COLUMN_TITLE],
    calories: Common.getIntFromArray(line, COLUMN_CALORIES),
    fat: Common.getIntFromArray(line, COLUMN_FAT),
    carbs: Common.getIntFromArray(line, COLUMN_CARBS),
    sugar: Common.getIntFromArray(line, COLUMN_SUGAR),
    protein: Common.getIntFromArray(line, COLUMN_PROTEIN),
    alcohol: Common.getIntFromArray(line, COLUMN_ALCOHOL),
    portion: Common.getIntFromArray(line, COLUMN_PORTION),
    serving: Common.getIntFromArray(line, COLUMN_SERVING),
    unit: line[COLUMN_UNIT],
    vegetarian: Common.getBooleanFromArray(line, COLUMN_VEGETARIAN),
    vegan: Common.getBooleanFromArray(line, COLUMN_VEGAN)
  })
}

async function run() {
  fetch(FILE_PATH)
    .then(response => {
      if (!response.ok) throw new Error()
      else return response.text()
    })
    .then(result => {
      const lines = result.split('\n')

      const data = { healthy: [], casual: [] }
      let lineArray = []

      lines.forEach((item, i) => {
        currentLine = i + 1
        if (IGNORE_LINES.includes(i + 1)) return
        if (i > LAST_LINE - 1) return
        lineArray = Common.CSVtoArray(item)
        if (lineArray == null) {
          console.error('Invalid Item at ' + (i + 1) + ': ' + item)
          failingLines.push(currentLine)
          return
        }
        if (lineArray[COLUMN_HEALTHY] == '1') addItemToArray(data.healthy, lineArray)
        else if (lineArray[COLUMN_CASUAL] == '1') addItemToArray(data.casual, lineArray)
      })
      console.log(data)
      document.getElementById('result').innerHTML = `const data = JSON.parse("${JSON.stringify(data).replaceAll('"', '\\"')}"); export default data;`
      if (failingLines.length > 0) console.warn('Failing lines: ' + failingLines.join())
    }).catch(() => {
      document.getElementById('result').innerHTML = 'An error occurred while trying to fetch the file. Check if the file exists and whether you are running this locally.'
    })
  }

  run()
