const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const xmasFrom = (row, column, board) => {
  const possibilities = []

  if (column + 3 < board.length)
    possibilities.push(`${board[row][column]}${board[row][column+1]}${board[row][column+2]}${board[row][column+3]}`)

  if (column - 3 >= 0)
    possibilities.push(`${board[row][column]}${board[row][column-1]}${board[row][column-2]}${board[row][column-3]}`)

  if (row + 3 < board.length)
    possibilities.push(`${board[row][column]}${board[row+1][column]}${board[row+2][column]}${board[row+3][column]}`)

  if (row - 3 >= 0 )
    possibilities.push(`${board[row][column]}${board[row-1][column]}${board[row-2][column]}${board[row-3][column]}`)

  if (row + 3 < board.length && column + 3 < board.length)
    possibilities.push(`${board[row][column]}${board[row+1][column+1]}${board[row+2][column+2]}${board[row+3][column+3]}`)

  if (row - 3 >= 0 && column + 3 < board.length)
    possibilities.push(`${board[row][column]}${board[row-1][column+1]}${board[row-2][column+2]}${board[row-3][column+3]}`)

  if (row + 3 < board.length && column - 3 >= 0)
    possibilities.push(`${board[row][column]}${board[row+1][column-1]}${board[row+2][column-2]}${board[row+3][column-3]}`)

  if (row - 3 >= 0 && column - 3 >= 0)
    possibilities.push(`${board[row][column]}${board[row-1][column-1]}${board[row-2][column-2]}${board[row-3][column-3]}`)

  return possibilities.filter(p => p === 'XMAS' || p === 'SAMX').length
}

const board = inputLines().map(line => line.split(''))

const result = board.reduce((acc, row, rowIndex) =>
  row.reduce((rowAcc, char, columnIndex) => char === 'X' ? rowAcc + xmasFrom(rowIndex, columnIndex, board) : rowAcc, acc)
, 0)

console.log(result)