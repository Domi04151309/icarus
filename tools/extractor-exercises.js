import Common from './common.js'

const COLUMN_CATEGORY_TITLE = 0
const COLUMN_EXERCISE_TITLE = 1
const COLUMN_VARIATION_TITLE = 2
const COLUMN_FAT_LOSS = 3
const COLUMN_MUSCLE_GAIN = 4
const COLUMN_CARDIO = 5
const COLUMN_ENDURANCE= 6
const COLUMN_ARMS = 7
const COLUMN_SHOULDERS = 8
const COLUMN_BACK = 9
const COLUMN_CHEST = 10
const COLUMN_ABS = 11
const COLUMN_BOOTY = 12
const COLUMN_LEGS = 13
const COLUMN_SETS_LOW = 15
const COLUMN_SETS_MEDIUM = 16
const COLUMN_SETS_HIGH = 17
const COLUMN_SETS_FULL = 18
const COLUMN_REPETITIONS_LOW = 20
const COLUMN_REPETITIONS_MEDIUM = 21
const COLUMN_REPETITIONS_HIGH = 22
const COLUMN_REPETITIONS_FULL = 23
const COLUMN_TIME_LOW = 25
const COLUMN_TIME_MEDIUM = 26
const COLUMN_TIME_HIGH = 27
const COLUMN_TIME_FULL = 28
const COLUMN_TUTORIAL = 30
const COLUMN_INFORMATION = 31

const FILE_PATH = './Icarus%20Data%20-%20Exercises.csv'
const IGNORE_LINES = [1, 32, 48, 63]
const LAST_LINE = 109

let currentLine = 0
const failingLines = []

function extractJSON(string) {
  if (string == '') return []
  try {
    return JSON.parse(string.replaceAll("'", '"'))
  } catch (error) {
    console.error('Invalid JSON at ' + currentLine + ': ' + string)
    failingLines.push(currentLine)
    return []
  }
}

async function run() {
  await fetch(FILE_PATH)
    .then(response => {
      if (!response.ok) throw new Error()
      else return response.text()
    })
    .then(result => {
      const lines = result.split('\n')

      const data = []
      let lineArray = []
      let categoryObj = null
      let exerciseObj = null

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
        if (lineArray[COLUMN_CATEGORY_TITLE] != '') {
          categoryObj = new Object()
          data.push(categoryObj)
          categoryObj.title = lineArray[COLUMN_CATEGORY_TITLE]
          categoryObj.exercises = []
          console.log('New category ' + lineArray[COLUMN_CATEGORY_TITLE] + ' at ' + (i + 1))
        }
        if (lineArray[COLUMN_EXERCISE_TITLE] != '') {
          exerciseObj = new Object()
          categoryObj.exercises.push(exerciseObj)
          exerciseObj.title = lineArray[COLUMN_EXERCISE_TITLE]
          exerciseObj.variations = []
        }
        exerciseObj.variations.push({
          title: lineArray[COLUMN_VARIATION_TITLE],
          tutorial: extractJSON(lineArray[COLUMN_TUTORIAL]),
          information: extractJSON(lineArray[COLUMN_INFORMATION]),
          fatLoss: Common.getIntFromArray(lineArray, COLUMN_FAT_LOSS),
          muscleGain: Common.getIntFromArray(lineArray, COLUMN_MUSCLE_GAIN),
          cardio: Common.getIntFromArray(lineArray, COLUMN_CARDIO),
          endurance: Common.getIntFromArray(lineArray, COLUMN_ENDURANCE),
          arms: Common.getIntFromArray(lineArray, COLUMN_ARMS),
          shoulders: Common.getIntFromArray(lineArray, COLUMN_SHOULDERS),
          back: Common.getIntFromArray(lineArray, COLUMN_BACK),
          chest: Common.getIntFromArray(lineArray, COLUMN_CHEST),
          abs: Common.getIntFromArray(lineArray, COLUMN_ABS),
          booty: Common.getIntFromArray(lineArray, COLUMN_BOOTY),
          legs: Common.getIntFromArray(lineArray, COLUMN_LEGS),
          intensities: {
            low: {
              sets: lineArray[COLUMN_SETS_LOW],
              repetitions: lineArray[COLUMN_REPETITIONS_LOW],
              time: lineArray[COLUMN_TIME_LOW]
            },
            medium: {
              sets: lineArray[COLUMN_SETS_MEDIUM],
              repetitions: lineArray[COLUMN_REPETITIONS_MEDIUM],
              time: lineArray[COLUMN_TIME_MEDIUM]
            },
            high: {
              sets: lineArray[COLUMN_SETS_HIGH],
              repetitions: lineArray[COLUMN_REPETITIONS_HIGH],
              time: lineArray[COLUMN_TIME_HIGH]
            },
            full: {
              sets: lineArray[COLUMN_SETS_FULL],
              repetitions: lineArray[COLUMN_REPETITIONS_FULL],
              time: lineArray[COLUMN_TIME_FULL]
            }
          }
        })
      })
      console.log(data)
      document.getElementById('result').innerHTML = `const data = JSON.parse("${JSON.stringify(data).replaceAll('"', '\\"')}"); export default data;`
      console.log('Failing lines: ' + failingLines.join())
    }).catch(() => {
      document.getElementById('result').innerHTML = 'An error occurred while trying to fetch the file. Check if the file exists and whether you are running this locally.'
    })
  }

  run()
