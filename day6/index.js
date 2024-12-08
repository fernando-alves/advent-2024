const fs = require('fs')

const readFile = path => fs.readFileSync(path).toString()
const inputLines = (separator = '\n') => readFile('input').split(separator)

const DIRECTIONS = {
  N: {
    move: ({ row, column }) => ({ row: row - 1, column }),
    rotate: () => DIRECTIONS.E
  },
  E: {
    move: ({ row, column }) => ({ row, column: column + 1 }),
    rotate: () => DIRECTIONS.S
  },
  S: {
    move: ({ row, column }) => ({ row: row + 1, column }),
    rotate: () => DIRECTIONS.W
  },
  W: {
    move: ({ row, column }) => ({ row, column: column - 1 }),
    rotate: () => DIRECTIONS.N
  }
}

const parse = (char, row, column) => {
  switch (char) {
    case '#':
      return { isObstacle: true }
    case '^':
      return { isGuard: true, direction: DIRECTIONS.N, position: { row, column, } }
    default:
      return {}
  }
}

const initializeHistory = () => {
  const visited = new Set()
  return {
    add: position => visited.add(JSON.stringify(position)),
    size: () => visited.size
  }
}

const patrol = (guard, board) => {
  const history = initializeHistory()

  do {
    const nextPosition = guard.direction.move(guard.position)

    if (board[nextPosition.row]?.[nextPosition.column]?.isObstacle) {
      guard.direction = guard.direction.rotate()
      continue
    }

    history.add(guard.position)
    guard.position = nextPosition
  } while (guard.position.row < board.length && guard.position.column < board.length)

  return history
}

const board = inputLines().map((row, rowIndex) => row.split('').map((char, columnIndex) => parse(char, rowIndex, columnIndex)))
const guard = board.flat().find(p => p.isGuard)

const history = patrol(guard, board)

console.log(history.size())