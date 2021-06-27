import Common from './common.js'

import Exercises from '../js/data/exercises.js'

const COLUMN_CATEGORY_TITLE = 0
const COLUMN_WORKOUT_TITLE = 1
const COLUMN_EXERCISE_TITLE = 2
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
/*const COLUMN_SETS_LOW = 15
const COLUMN_SETS_MEDIUM = 16
const COLUMN_SETS_HIGH = 17
const COLUMN_SETS_FULL = 18
const COLUMN_TUTORIAL = 29
const COLUMN_INFORMATION = 30*/

const FILE_PATH = './tools/Icarus%20Data%20-%20Workouts.csv'
const IGNORE_LINES = [1, 2]
const LAST_LINE = Infinity

let currentLine = 0
const failingLines = []

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
      let typeObj = null

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
          categoryObj.types = []
          Common.log('Category "' + lineArray[COLUMN_CATEGORY_TITLE] + '"')
        }
        if (lineArray[COLUMN_WORKOUT_TITLE] != '') {
          typeObj = new Object()
          categoryObj.types.push(typeObj)
          typeObj.title = lineArray[COLUMN_WORKOUT_TITLE]
          /*typeObj.tutorial = extractJSON(lineArray[COLUMN_TUTORIAL])
          typeObj.information = extractJSON(lineArray[COLUMN_INFORMATION])*/
          typeObj.fatLoss = Common.getIntFromArray(lineArray, COLUMN_FAT_LOSS)
          typeObj.muscleGain = Common.getIntFromArray(lineArray, COLUMN_MUSCLE_GAIN)
          typeObj.cardio = Common.getIntFromArray(lineArray, COLUMN_CARDIO)
          typeObj.endurance = Common.getIntFromArray(lineArray, COLUMN_ENDURANCE)
          typeObj.arms = Common.getIntFromArray(lineArray, COLUMN_ARMS)
          typeObj.shoulders = Common.getIntFromArray(lineArray, COLUMN_SHOULDERS)
          typeObj.back = Common.getIntFromArray(lineArray, COLUMN_BACK)
          typeObj.chest = Common.getIntFromArray(lineArray, COLUMN_CHEST)
          typeObj.abs = Common.getIntFromArray(lineArray, COLUMN_ABS)
          typeObj.booty = Common.getIntFromArray(lineArray, COLUMN_BOOTY)
          typeObj.legs = Common.getIntFromArray(lineArray, COLUMN_LEGS)
          typeObj.intensities = null
          typeObj.exercises = []
          Common.log('  Type "' + lineArray[COLUMN_WORKOUT_TITLE] + '"')
        } else {
          Exercises.forEach((itemX, x) => {
            itemX.exercises.forEach((itemY, y) => {
              if (itemY.title == lineArray[COLUMN_EXERCISE_TITLE]) typeObj.exercises.push([x, y])
            })
          })
          Common.log('    Exercise "' + lineArray[COLUMN_EXERCISE_TITLE] + '"')
        }
      })
      Common.printResult(data)
      if (failingLines.length > 0) console.warn('Failing lines: ' + failingLines.join())
    }).catch(() => {
      document.getElementById('result').innerHTML = 'An error occurred while trying to fetch the file. Check if the file exists and whether you are running this locally.'
    })
  }

  export default run
