import './style.css'
import {
  BufferGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from 'three'

interface StarVector extends Vector3 {
  velocity: number
  acceleration: number
}

let scene: Scene
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let starGeo: BufferGeometry
let stars: Points
let points: StarVector[]

const sprite = new TextureLoader().load('star.png')
const startMaterial = new PointsMaterial({
  color: 0xaaaaaa,
  size: 0.7,
  map: sprite
})

function init () {
  scene = new Scene()

  camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 1
  camera.rotation.x = Math.PI / 2

  renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  points = []
  starGeo = new BufferGeometry()
  for (let c = 0; c < 6000; c += 1) {
    const star = new Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    )
    points.push(star)
  }
  starGeo.setFromPoints(points)

  stars = new Points(starGeo, startMaterial)
  scene.add(stars)

  document.body.appendChild(renderer.domElement)

  animate()
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
  points.forEach((p) => {
    p.velocity += p.acceleration
    p.y -= p.velocity;

    if (p.y < -200) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  stars.rotation.y += 0.002;
  starGeo.attributes.position.needsUpdate = true

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init()
