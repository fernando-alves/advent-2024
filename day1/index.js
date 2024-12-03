const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const sortAscending = list => list.sort((a, b) => a - b)

const [left, right] = inputLines().reduce((result, line) => {
  const [left, right] = line.split('   ').map(Number)
  return [result[0].concat(left), result[1].concat(right)]
}, [[], []]).map(sortAscending)

const sumOfDifference = left.reduce((sum, _, index) => sum + Math.abs(left[index] - right[index]), 0)

console.log(sumOfDifference)

const frequencies = right.reduce((frequencies, id) => {
  frequencies[id] = (frequencies[id] || 0) + 1
  return frequencies
}, {})

const similarityScore = left.reduce((score, id) => score + (id * (frequencies[id] || 0)), 0)

console.log(similarityScore)