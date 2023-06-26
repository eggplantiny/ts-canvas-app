import type Joint from './Joint'
import type { BodySetup } from './Body'
import Body from './Body'
import type Contact from './Contact'

type Array4<T> = [T, T, T, T]

interface WorldSetup {
  gravity?: number
  iterations?: number
  timeStep?: number
  friction?: number
  allowedPenetration?: number
  biasFactor?: number
  relativeTol?: number
  absoluteTol?: number
}

export default class World {
  gravity: number
  iterations: number
  timeStep: number
  friction: number
  allowedPenetration: number
  biasFactor: number
  relativeTol: number
  absoluteTol: number
  invDT: number
  bodies: Body[] = []
  joints: Joint[] = []
  contacts: Contact[] = []
  numContacts = 0
  maxContacts = 100
  ie: Array4<number>
  c1: Array4<number>
  c2: Array4<number>
  bodyCount: number
  jointsCount: number

  constructor(setup: WorldSetup = {}) {
    this.gravity = setup.gravity ?? 50
    this.iterations = setup.iterations ?? 10
    this.timeStep = setup.timeStep ?? 1 / 60
    this.friction = setup.friction ?? 0.2
    this.allowedPenetration = setup.allowedPenetration ?? 0.01
    this.invDT = 1 / this.timeStep
    this.biasFactor = setup.biasFactor ?? 0.8
    this.relativeTol = setup.relativeTol ?? 0.95
    this.absoluteTol = setup.absoluteTol ?? 0.01
    this.ie = [0, 0, 0, 0]
    this.c1 = [0, 0, 0, 0]
    this.c2 = [0, 0, 0, 0]
    this.bodyCount = 0
    this.jointsCount = 0
  }

  addBody(bodySetup: BodySetup): Body {
    const body = new Body(this, bodySetup)
    this.bodies.push(body)
    this.bodyCount = this.bodies.length
    return body
  }

  collide(bodyA: Body, bodyB: Body, dpx: number, dpy: number) {

  }

  computeIncidentEdge(ie: Array4<number>, body: Body, nx: number, ny: number) {
    const nrx = -(body.cos * nx + body.sin * ny)
    const nry = -(body.cos * ny - body.sin * nx)

    if (Math.abs(nrx) > Math.abs(nry)) {
      if (nrx > 0.0) {
        ie[0] = body.halfWidth
        ie[1] = body.halfHeight * -1
        ie[2] = body.halfWidth
        ie[3] = body.halfHeight
      }
      else {
        ie[0] = body.halfWidth * -1
        ie[1] = body.halfHeight
        ie[2] = body.halfWidth * -1
        ie[3] = body.halfHeight * -1
      }
    }
    else {
      if (nry > 0.0) {
        ie[0] = body.halfWidth
        ie[1] = body.halfHeight
        ie[2] = body.halfWidth * -1
        ie[3] = body.halfHeight
      }
      else {
        ie[0] = body.halfWidth * -1
        ie[1] = body.halfHeight * -1
        ie[2] = body.halfWidth
        ie[3] = body.halfHeight * -1
      }
    }

    const x = ie[0]
    const y = ie[1]

    ie[0] = body.px + x * body.cos - y * body.sin
    ie[1] = body.py + x * body.sin + y * body.cos

    const x2 = ie[2]
    const y2 = ie[3]

    ie[2] = body.px + x2 * body.cos - y2 * body.sin
    ie[3] = body.py + x2 * body.sin + y2 * body.cos
  }
}
