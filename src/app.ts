export default class App {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor() {
    this.canvas = document.querySelector('canvas')!

    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'

    this.ctx = this.canvas.getContext('2d')!
  }

  init() {
    console.log('App is initialized')
  }

  run() {
    console.log('App is running')
  }
}
