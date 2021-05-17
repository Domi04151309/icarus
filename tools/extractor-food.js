import Common from './common.js'

const COLUMN_TITLE = 0
const COLUMN_CALORIES = 1
const COLUMN_FAT = 2
const COLUMN_CARBS = 3
const COLUMN_PROTEINS = 4
const COLUMN_SUGAR = 5
const COLUMN_ALCOHOL = 6
const COLUMN_PORTION = 7
const COLUMN_SERVING = 8
const COLUMN_UNIT = 9
/*const COLUMN_FAT_LOSS = 10
const COLUMN_MUSCLE_GAIN = 11
const COLUMN_LESS_SWEETS = 12
const COLUMN_MORE_WATER = 13*/
const COLUMN_VEGETARIAN = 14
const COLUMN_VEGAN = 15
const COLUMN_HEALTHY = 16
const COLUMN_CASUAL = 17

const FILE_PATH = './Icarus%20Data%20-%20Nutrition%20Data.csv'
const IGNORE_LINES = [1, 2, 19, 20, 21, 36, 37, 38, 46, 47, 48, 61, 62, 63, 72, 73, 74, 81, 82, 83, 89, 90, 91, 95, 96, 97, 100, 101, 112, 121]
const LAST_LINE = 128

let currentLine = 0
const failingLines = []

function addItemToArray(array, line) {
  array.push({
    title: line[COLUMN_TITLE],
    calories: Common.getIntFromArray(line, COLUMN_CALORIES),
    fat: Common.getIntFromArray(line, COLUMN_FAT),
    carbs: Common.getIntFromArray(line, COLUMN_CARBS),
    sugar: Common.getIntFromArray(line, COLUMN_SUGAR),
    proteins: Common.getIntFromArray(line, COLUMN_PROTEINS),
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
      console.log('Failing lines: ' + failingLines.join())
    }).catch(() => {
      document.getElementById('result').innerHTML = 'An error occurred while trying to fetch the file. Check if the file exists and whether you are running this locally.'
    })
  }

  run()
