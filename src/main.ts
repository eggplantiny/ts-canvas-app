import App from './app'
import './assets/styles/style.css'

function onMounted() {
  const app = new App()

  app.run()
}

onMounted()
