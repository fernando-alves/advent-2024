const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const reports = inputLines().map(line => line.split(' ').map(Number))

const identifyCriteria = (a, b) => {
  const descending = difference => difference >= 1 && difference <= 3
  const ascending = difference => difference >= -3 && difference <= -1
  return a > b ? descending : ascending
}

const withTolerance = (criteria) => {
  let tolerance = 1;
  return difference => criteria(difference) || --tolerance >= 0;
}

const isStrictSafe = report => {
  const criteria = identifyCriteria(report[0], report[1])
  return report.slice(0, report.length - 1).every((entry, index) => criteria(entry - report[index + 1]));
}

const isLooseSafe = report => {
  const criteria = withTolerance(identifyCriteria(report[0], report[1]))
  return report.slice(0, report.length - 1).every((entry, index) => criteria(entry - report[index + 1]));
}

const safe = reports.filter(isStrictSafe)
console.log(safe.length)

const looseSafe = reports.filter(isLooseSafe)
console.log(looseSafe.length)