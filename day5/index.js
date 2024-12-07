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

const fixUpdate = (update, rules) => update.toSorted((a, b) => {
  if (a === b) return 0
  if (rules[a]?.includes(b)) return -1
  return 1
})

const isCorrect = (update, rules) => update.toString() === fixUpdate(update, rules).toString()

const splitByCorrectness = (updates, rules) => updates.reduce(({ correct, incorrect }, update) => {
  isCorrect(update, rules) ? correct.push(update) : incorrect.push(update)
  return { correct, incorrect }
}, { correct: [], incorrect: [] })

const sumMiddle = updates => updates.reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0)

const { updates, rules } = rulesAndUpdates(inputLines())
const { correct, incorrect } = splitByCorrectness(updates, rules)

console.log(sumMiddle(correct))

const fixed = incorrect.map(update => fixUpdate(update, rules))

console.log(sumMiddle(fixed))