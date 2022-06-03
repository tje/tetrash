import { Matrix } from './matrix'
import { SHAPE } from './shapes'

const sleep = (dur = 500) => new Promise((res) => setTimeout(res, dur))

const mx = Matrix.fromShape(SHAPE.T)

const board = new Matrix(7, 7)
;(async () => {
  let rots = 4
  while (rots > 0) {
    for (let y = 0; y < 7 - mx.rows + 1; y++) {
      for (let x = 0; x < 7 - mx.columns + 1; x++) {
        console.clear()
        board.clear()
        for (let yy = 0; yy < mx.rows; yy++) {
          for (let xx = 0; xx < mx.columns; xx++) {
            if (mx.getCell(xx, yy) === 0) {
              continue
            }
            if (x + xx >= board.columns || y + yy >= board.rows) {
              continue
            }
            board.setCell(x + xx, y + yy, 1)
          }
        }
        const displayGrid = board.toArray()
          .map((row) => row.map((cell) => cell === 1 ? '██' : '  ').join(''))
          .map((line) => `|${line}|`)
          .join('\n')
        console.log('┌' + '─'.repeat(board.columns * 2) + '┐')
        console.log(displayGrid)
        console.log('└' + '─'.repeat(board.columns * 2) + '┘')
        await sleep(50)
      }
    }
    mx.rotate()
    rots--
  }
})()
