export default class Vector2D {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(vector: Vector2D) {
    this.x += vector.x
    this.y += vector.y
  }

  subtract(vector: Vector2D) {
    this.x -= vector.x
    this.y -= vector.y
  }

  divide(scalar: number) {
    this.x /= scalar
    this.y /= scalar
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    const magnitude = this.magnitude()
    this.divide(magnitude)
  }

  multiply(scalar: number) {
    this.x *= scalar
    this.y *= scalar
  }

  limit(max: number) {
    const magnitude = this.magnitude()
    if (magnitude > max) {
      this.normalize()
      this.multiply(max)
    }
  }

  static add(vector1: Vector2D, vector2: Vector2D) {
    return new Vector2D(vector1.x + vector2.x, vector1.y + vector2.y)
  }

  static subtract(vector1: Vector2D, vector2: Vector2D) {
    return new Vector2D(vector1.x - vector2.x, vector1.y - vector2.y)
  }

  static multiply(vector: Vector2D, scalar: number) {
    return new Vector2D(vector.x * scalar, vector.y * scalar)
  }

  static divide(vector: Vector2D, scalar: number) {
    return new Vector2D(vector.x / scalar, vector.y / scalar)
  }

  static magnitude(vector: Vector2D) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
  }

  static normalize(vector: Vector2D) {
    const magnitude = Vector2D.magnitude(vector)
    return Vector2D.divide(vector, magnitude)
  }

  static limit(vector: Vector2D, max: number) {
    const magnitude = Vector2D.magnitude(vector)
    if (magnitude > max)
      return Vector2D.multiply(Vector2D.normalize(vector), max)

    return vector
  }
}
