const initializeBoard = (rows = 10, cols = 30) => {
  return Array(cols).fill(Array(rows).fill(''))
}

module.exports = {initializeBoard}
