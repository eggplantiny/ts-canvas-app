import type { Drawable } from '../interface'
import type World from './World'

export interface BodySetup {
  width?: number
  height?: number
  x?: number
  y?: number
  vx?: number
  vy?: number
  angularVector?: number
  rotation?: number
  friction?: number
  mass?: number
  color?: string
  visible?: boolean
}

export default class Body implements Drawable {
  px: number
  py: number
  vx: number
  vy: number
  halfWidth: number
  halfHeight: number
  radius: number
  angularVelocity: number
  rotationAngle: number
  cos: number
  sin: number
  friction: number
  inverseMass: number
  inverseInertia: number
  dt: number
  gravity: number
  color: string
  visible: boolean

  constructor(world: World, setup: BodySetup = {}) {
    const width = setup.width ?? 1.0
    const height = setup.height ?? 1.0

    this.px = setup.x ?? 0.0
    this.py = setup.y ?? 0.0
    this.vx = setup.vx ?? 0.0
    this.vy = setup.vy ?? 0.0
    this.halfWidth = width / 2
    this.halfHeight = height / 2
    this.radius = Math.sqrt(this.halfWidth * this.halfWidth + this.halfHeight * this.halfHeight)
    this.angularVelocity = setup.angularVector ?? 0.0
    this.rotationAngle = setup.rotation ?? 0.0

    this.cos = Math.cos(this.rotationAngle)
    this.sin = Math.sin(this.rotationAngle)

    this.friction = setup.friction ?? world.friction
    const mass = setup.mass ?? Infinity
    this.color = setup.color ?? '#FFF'
    this.visible = setup.visible ?? true

    if (mass < Infinity) {
      this.inverseMass = 1 / mass
      this.inverseInertia = 12 / (mass * (width * width + height * height))
    }
    else {
      this.inverseMass = 0
      this.inverseInertia = 0
    }

    this.dt = world.timeStep
    this.gravity = world.gravity
  }

  intergrate() {
    if (!this.inverseMass)
      return

    this.px += this.vx * this.dt
    this.py += this.vy * this.dt
    this.rotationAngle += this.angularVelocity * this.dt
    this.vy += this.gravity * this.dt

    this.cos = Math.cos(this.rotationAngle)
    this.sin = Math.sin(this.rotationAngle)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible)
      return

    const chw = this.cos * this.halfWidth
    const shw = this.sin * this.halfWidth
    const chh = this.cos * this.halfHeight
    const shh = this.sin * this.halfHeight

    ctx.beginPath()

    ctx.moveTo(this.px - chw - shh, this.py - shw + chh)
    ctx.lineTo(this.px + chw - shh, this.py + shw + chh)
    ctx.lineTo(this.px + chw + shh, this.py + shw - chh)
    ctx.lineTo(this.px - chw + shh, this.py - shw - chh)

    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.stroke()
  }
}
