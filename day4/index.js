const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const xmasFrom = (row, column, board) => {
  const possibilities = [
    `${board[row]?.[column]}${board[row]?.[column+1]}${board[row]?.[column+2]}${board[row]?.[column+3]}`,
    `${board[row]?.[column]}${board[row]?.[column-1]}${board[row]?.[column-2]}${board[row]?.[column-3]}`,
    `${board[row]?.[column]}${board[row+1]?.[column]}${board[row+2]?.[column]}${board[row+3]?.[column]}`,
    `${board[row]?.[column]}${board[row-1]?.[column]}${board[row-2]?.[column]}${board[row-3]?.[column]}`,
    `${board[row]?.[column]}${board[row+1]?.[column+1]}${board[row+2]?.[column+2]}${board[row+3]?.[column+3]}`,
    `${board[row]?.[column]}${board[row-1]?.[column+1]}${board[row-2]?.[column+2]}${board[row-3]?.[column+3]}`,
    `${board[row]?.[column]}${board[row+1]?.[column-1]}${board[row+2]?.[column-2]}${board[row+3]?.[column-3]}`,
    `${board[row]?.[column]}${board[row-1]?.[column-1]}${board[row-2]?.[column-2]}${board[row-3]?.[column-3]}`,
  ]

  return possibilities.filter(p => p === 'XMAS' || p === 'SAMX').length
}

const board = inputLines().map(line => line.split(''))

const result = board.reduce((acc, row, rowIndex) =>
  row.reduce((rowAcc, char, columnIndex) => char === 'X' ? rowAcc + xmasFrom(rowIndex, columnIndex, board) : rowAcc, acc)
, 0)

console.log(result)