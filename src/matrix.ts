
type IBit = 1 | 0
type IMatrixArray = IBit[][]

export class Matrix {
  private _buf: Uint8Array
  constructor (private _columns: number, private _rows: number) {
    this._buf = new Uint8Array(_columns * _rows)
  }
  get columns () {
    return this._columns
  }
  get rows () {
    return this._rows
  }

  public clone (): Matrix {
    const copy = new Matrix(this.columns, this.rows)
    copy.setShape(this.toArray())
    return copy
  }

  public toArray (): IMatrixArray {
    const matrix = []
    for (let y = 0; y < this.rows; y++) {
      const row: IBit[] = []
      matrix.push(row)
      for (let x = 0; x < this.columns; x++) {
        const idx = (y * this.columns) + x
        row.push(this._buf.at(idx) ? 1 : 0)
      }
    }
    return matrix
  }

  public setShape (shape: IMatrixArray): void {
    const cols = this.columns
    const rows = this.rows
    if (shape.length !== rows) {
      throw new Error(`Invalid shape size: expected ${rows} rows, got ${shape.length}`)
    }
    if (shape.some((row) => row.length !== cols)) {
      throw new Error(`Invalid shape size: expected ${cols} columns for each row`)
    }
    this._buf.set(shape.flat(), 0)
  }

  public clear () {
    this._buf.set(Array(this.columns * this.rows).fill(0), 0)
  }

  public setCell (x: number, y: number, position: IBit) {
    const idx = y * this.columns + x
    this._buf.set([ position ], idx)
  }

  public getCell (x: number, y: number) {
    const idx = y * this.columns + x
    return this._buf.at(idx) ? 1 : 0
  }

  public getColumn (x: number): IBit[] {
    if (x < 0 || x >= this.columns) {
      throw new Error(`Column index (${x}) out of bounds; must be between 0 and ${this.columns}`)
    }
    const column: IBit[] = []
    for (let y = 0; y < this.rows; y++) {
      column.push(this.getCell(x, y))
    }
    return column
  }

  public getRow (y: number): IBit[] {
    if (y < 0 || y >= this.rows) {
      throw new Error(`Row index (${y}) out of bounds; must be between 0 and ${this.rows}`)
    }
    const row: IBit[] = []
    for (let x = 0; x < this.columns; x++) {
      row.push(this.getCell(x, y))
    }
    return row
  }

  /**
   * Rotates the matrix in 90 degree increments. Moves counter-clockwise if
   * `steps` is negative.
   * @param {number} steps Number of times and direction to rotate
   */
  public rotate (steps = 1) {
    let times = Math.abs(steps)

    while (times > 0) {
      const cols = this.columns
      const rows = this.rows
      const columns = []
      for (let x = 0; x < cols; x++) {
        const column = this.getColumn(x)
        if (steps > 0) {
          column.reverse()
        }
        columns.push(column)
      }

      this._columns = rows
      this._rows = cols
      this._buf.set(columns.flat(), 0)
      times--
    }
  }

  public static fromShape (shape: IMatrixArray): Matrix {
    const rows = shape.length
    const columns = shape[0].length
    const matrix = new this(columns, rows)
    matrix.setShape(shape)
    return matrix
  }
}
