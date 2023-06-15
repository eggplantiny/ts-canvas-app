export default class Rect {
  x: number
  y: number
  width: number
  height: number
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get left() {
    return this.x
  }

  get right() {
    return this.x + this.width
  }

  get top() {
    return this.y
  }

  get bottom() {
    return this.y + this.height
  }

  get center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    }
  }

  get area() {
    return this.width * this.height
  }

  get isEmpty() {
    return this.width === 0 && this.height === 0
  }

  intersects(rect: Rect) {
    return (
      this.x < rect.x + rect.width
      && this.x + this.width > rect.x
      && this.y < rect.y + rect.height
      && this.y + this.height > rect.y
    )
  }

  contains(rect: Rect) {
    return (
      this.x <= rect.x
      && this.x + this.width >= rect.x + rect.width
      && this.y <= rect.y
      && this.y + this.height >= rect.y + rect.height
    )
  }

  static get zero() {
    return new Rect(0, 0, 0, 0)
  }
}
