const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const xmasFrom = (line, column, board) => {
  const possibilities = []

  if (column + 3 < board.length)
    possibilities.push(`${board[line][column]}${board[line][column+1]}${board[line][column+2]}${board[line][column+3]}`)

  if (column - 3 >= 0)
    possibilities.push(`${board[line][column]}${board[line][column-1]}${board[line][column-2]}${board[line][column-3]}`)

  if (line + 3 < board.length)
    possibilities.push(`${board[line][column]}${board[line+1][column]}${board[line+2][column]}${board[line+3][column]}`)

  if (line - 3 >= 0 )
    possibilities.push(`${board[line][column]}${board[line-1][column]}${board[line-2][column]}${board[line-3][column]}`)

  if (line + 3 < board.length && column + 3 < board.length)
    possibilities.push(`${board[line][column]}${board[line+1][column+1]}${board[line+2][column+2]}${board[line+3][column+3]}`)

  if (line - 3 >= 0 && column + 3 < board.length)
    possibilities.push(`${board[line][column]}${board[line-1][column+1]}${board[line-2][column+2]}${board[line-3][column+3]}`)

  if (line + 3 < board.length && column - 3 >= 0)
    possibilities.push(`${board[line][column]}${board[line+1][column-1]}${board[line+2][column-2]}${board[line+3][column-3]}`)

  if (line - 3 >= 0 && column - 3 >= 0)
    possibilities.push(`${board[line][column]}${board[line-1][column-1]}${board[line-2][column-2]}${board[line-3][column-3]}`)

  return possibilities.filter(p => p === 'XMAS' || p === 'SAMX').length
}

const board = inputLines().map(line => line.split(''))

let result = 0;
for(let line = 0; line < board.length; line++) {
  for(let column = 0; column < board[0].length; column++) {
    const char = board[line][column]
    if (char !== 'X') continue
    result += xmasFrom(line, column, board)
  }
}

console.log(result)