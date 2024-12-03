const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const DO_PATTERN = /do\(\)/
const DONT_PATTERN = /don\'t\(\)/
const NUMBERS_PATTERN = /\d{1,3},\d{1,3}/
const MUL_PATTERN = new RegExp(`mul\\(${NUMBERS_PATTERN.source}\\)`, "gm")
const INSTRUCTION_PATTERN = new RegExp(`${DO_PATTERN.source}|${DONT_PATTERN.source}|${MUL_PATTERN.source}`, "gm")

const toMultiplicationInstruction = input => {
  const [a, b] = input.match(NUMBERS_PATTERN)[0].split(',').map(Number)
  return {
    run: state => {
      if (state.do) return { ...state, result: state.result + (a * b) }
      return state
    }
  }
}

const toInstruction = input => {
  if (input.match(DO_PATTERN)) return { run: state => ({ ...state, do: true }) }
  if (input.match(DONT_PATTERN)) return { run: state => ({ ...state, do: false }) }

  return toMultiplicationInstruction(input)
}

const parseMulInstructions = line => (line.match(MUL_PATTERN) || []).map(toInstruction)
const mulInstructions = inputLines().reduce((result, line) => result.concat(parseMulInstructions(line)), [])
const mulResult = mulInstructions.reduce((state, instruction) => instruction.run(state), { do: true, result: 0 }).result

console.log(mulResult)

const parseInstructions = line => (line.match(INSTRUCTION_PATTERN) || []).map(toInstruction)
const instructions = inputLines().reduce((result, line) => result.concat(parseInstructions(line)), [])
const result = instructions.reduce((state, instruction) => instruction.run(state), { do: true, result: 0 }).result

console.log(result)