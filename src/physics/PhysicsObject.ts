import type { Updatable } from '../interface'
import type Body from './Body'
import Vector2D from './Vector2D'

export default class PhysicsObject implements Updatable {
  body: Body

  constructor(body: Body) {
    this.body = body
  }

  applyForce(force: Vector2D) {
    this.body.velocity.add(Vector2D.divide(force, this.body.mass))
  }

  update() {

  }
}
