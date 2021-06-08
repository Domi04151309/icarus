import JsonHelper from './json.js'

//TODO: Recalc values on preference change

const MaxProgress = {
  water: 0,
  calories: 0,
  fat: 0,
  carbs: 0,
  proteins: 0,
  exercises: 1,
  yoga: 1,
  sleep: 9,
  meditation: 1
}

function emptyObject() {
  return {}
}

const info = JsonHelper.get('info', emptyObject)
info.weight = parseInt(info?.weight || 62, 10)

const nutrition = JsonHelper.get('nutrition', emptyObject)
const fitness = JsonHelper.get('fitness', emptyObject)

function calcSwitchValue(item) {
  return Math.round((parseInt(item, 10) * 2 - 100) / 100)
}

function divideNutritionByTwo() {
  MaxProgress.calories /= 2
  MaxProgress.fat /= 2
  MaxProgress.carbs /= 2
  MaxProgress.proteins /= 2
}

if (info.gender == "f") {
  if (nutrition.moreWater) MaxProgress.water = 13
  else MaxProgress.water = 11

  MaxProgress.calories = 2000
  MaxProgress.fat = 1 * info.weight
  MaxProgress.carbs = 3 * info.weight
  MaxProgress.proteins = 1 * info.weight

  switch (calcSwitchValue(nutrition.fatLoss)) {
    case 1:
      MaxProgress.calories = 1500
      MaxProgress.fat = 50
      MaxProgress.carbs = 100
      MaxProgress.proteins = 1.8 * info.weight
      break
    case -1:
      MaxProgress.calories = 2100
      MaxProgress.fat = 1 * info.weight
      MaxProgress.carbs = 3 * info.weight
      MaxProgress.proteins = 1.5 * info.weight
      break
  }

  switch (calcSwitchValue(fitness.muscleGain)) {
    case 1:
      MaxProgress.calories += 44 * info.weight
      MaxProgress.fat += 2 * info.weight
      MaxProgress.carbs += 6 * info.weight
      MaxProgress.proteins += 2 * info.weight
      divideNutritionByTwo()
      break
    case -1:
      MaxProgress.calories += 1800
      MaxProgress.fat += 0.5 * info.weight
      MaxProgress.carbs += 3 * info.weight
      MaxProgress.proteins += 0.81 * info.weight
      divideNutritionByTwo()
      break
  }
} else {
  // Default to male
  if (nutrition.moreWater) MaxProgress.water = 15
  else MaxProgress.water = 13

  MaxProgress.calories = 2500
  MaxProgress.fat = 1 * info.weight
  MaxProgress.carbs = 3 * info.weight
  MaxProgress.proteins = 1 * info.weight

  switch (calcSwitchValue(nutrition.fatLoss)) {
    case 1:
      MaxProgress.calories = 2000
      MaxProgress.fat = 50
      MaxProgress.carbs = 100
      MaxProgress.proteins = 1.8 * info.weight
      break
    case -1:
      MaxProgress.calories = 2600
      MaxProgress.fat = 1 * info.weight
      MaxProgress.carbs = 3 * info.weight
      MaxProgress.proteins = 1.5 * info.weight
      break
  }

  switch (calcSwitchValue(fitness.muscleGain)) {
    case 1:
      MaxProgress.calories += 44 * info.weight
      MaxProgress.fat += 2 * info.weight
      MaxProgress.carbs += 6 * info.weight
      MaxProgress.proteins += 2 * info.weight
      divideNutritionByTwo()
      break
    case -1:
      MaxProgress.calories += 2400
      MaxProgress.fat += 0.5 * info.weight
      MaxProgress.carbs += 3 * info.weight
      MaxProgress.proteins += 0.81 * info.weight
      divideNutritionByTwo()
      break
  }
}

export default MaxProgress
