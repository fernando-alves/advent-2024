const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const addRule = (rule, rules) => {
  const [key, subsequent] = rule.split('|').map(Number)
  rules[key] = [...(rules[key] || []), subsequent]
  return rules
}

const addUpdate = (update, updates) => [...updates, update.split(',').map(Number)]

const isInRightOrder = (update, rules) => update.slice(1).every((entry, index) => update.slice(0, index + 1).every(p => !rules[entry]?.includes(p)))

const { rules, updates } = inputLines().reduce(({ rules, updates }, input) => {
  if (input.includes('|')) rules = addRule(input, rules)
  if (input.includes(',')) updates = addUpdate(input, updates)
  return { rules, updates }
}, { rules: {}, updates: [] })

const correctUpdates = updates.filter(update => isInRightOrder(update, rules))
const sumMiddlePage = correctUpdates.reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0)

console.log(sumMiddlePage)