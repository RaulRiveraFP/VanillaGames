import { header } from './componentes/header'
import { footer } from './componentes/footer'
import { home } from "./vistas/homeVista";
import 'bootstrap'
import './scss/styles.scss'

import { enrutador } from './componentes/enrutador'

document.querySelector('header').innerHTML = header.template
header.script()
document.querySelector('footer').innerHTML = footer.template

enrutador.observadorRutas()
// Cargamos la página home
window.location = '#/home'

console.log(enrutador.rutas)

document.querySelector('header').innerHTML = header.template
document.querySelector('main').innerHTML = home.template

header.script()
