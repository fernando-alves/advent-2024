const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const rulesAndUpdates = lines => lines.reduce(({ rules, updates }, input) => {
  if (input.includes('|')) rules = addRule(input, rules)
  if (input.includes(',')) updates = addUpdate(input, updates)
  return { rules, updates }
}, { rules: {}, updates: [] })

const addRule = (rule, rules) => {
  const [key, subsequent] = rule.split('|').map(Number)
  rules[key] = [...(rules[key] || []), subsequent]
  return rules
}

const addUpdate = (update, updates) => [...updates, update.split(',').map(Number)]

const isInRightOrder = (update, rules) => update.slice(1).every((entry, index) => update.slice(0, index + 1).every(p => !rules[entry]?.includes(p)))

const checkCorrectness = (updates, rules) => updates.reduce(({ correct, incorrect }, update) => {
  isInRightOrder(update, rules) ? correct.push(update) : incorrect.push(update)
  return { correct, incorrect }
}, { correct: [], incorrect: [] })

const sumMiddle = updates => updates.reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0)

const swap = (update, i, j) => {
  const swapped = [...update]
  swapped[i] = update[j]
  swapped[j] = update[i]
  return swapped
}

const fixUpdate = update => {
  for(let i = 0; i < update.length; i++) {
    const entry = update[i]
    const defectivePrecedent = update.slice(0, i).findIndex(p => rules[entry]?.includes(p))

    if (defectivePrecedent >= 0) {
      return fixUpdate(swap(update, i, defectivePrecedent))
    }
  }

  return update
}

const { updates, rules } = rulesAndUpdates(inputLines())

const { correct, incorrect } = checkCorrectness(updates, rules)

console.log(sumMiddle(correct))

const fixed = incorrect.map(fixUpdate)

console.log(sumMiddle(fixed))