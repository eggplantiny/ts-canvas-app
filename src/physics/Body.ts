import type { Drawable } from '../interface'
import type Vector2D from './Vector2D'
import type Rect from './Rect'

export default abstract class Body implements Drawable {
  position: Vector2D
  velocity: Vector2D
  acceleration: Vector2D
  mass: number

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    acceleration: Vector2D,
    mass: number,
  ) {
    this.position = position
    this.velocity = velocity
    this.acceleration = acceleration
    this.mass = mass
  }

  // 충돌 감지를 위한 경계 상자를 반환하는 추상 메서드
  abstract get boundingBox(): Rect

  // 물체를 그리는 추상 메서드
  abstract draw(ctx: CanvasRenderingContext2D): void
}
