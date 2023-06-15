import Body from './Body'
import type Vector2D from './Vector2D'
import Rect from './Rect'

export default class Circle extends Body {
  radius: number

  constructor(position: Vector2D, velocity: Vector2D, mass: number, radius: number) {
    super(position, velocity, mass)
    this.radius = radius
  }

  get boundingBox(): Rect {
    return new Rect(this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
}
