type IShapeBit = 0 | 1
export type IShape = IShapeBit[][]

export const SHAPE: Record<string, IShape> = {
  T: [
    [ 1, 1, 1 ],
    [ 0, 1, 0 ],
  ],
  I: [
    [ 1, 1, 1, 1 ],
  ],
  O: [
    [ 1, 1 ],
    [ 1, 1 ],
  ],
  L: [
    [ 1, 0 ],
    [ 1, 0 ],
    [ 1, 1 ],
  ],
  J: [
    [ 0, 1 ],
    [ 0, 1 ],
    [ 1, 1 ],
  ],
  S: [
    [ 0, 1, 1 ],
    [ 1, 1, 0 ],
  ],
  Z: [
    [ 1, 1, 0 ],
    [ 0, 1, 1 ],
  ],
}
