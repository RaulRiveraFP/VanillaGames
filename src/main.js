import { header } from './componentes/header'
import { footer } from './componentes/footer'
import { enrutador } from './componentes/enrutador'
import { supabase } from "./bd/supabase";
// Import all of Bootstrap's JS
import 'bootstrap'
// Importamos estilos de scss
import './scss/styles.scss'

// Inyectamos el componente header
document.querySelector('header').innerHTML = header.template
header.script()

// Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template

enrutador.observadorRutas()
// Cargamos la página home
window.location = '#/home'


// Probamos a logearnos
const login = async ()=>{
    try {
      //USER LOGIN
      let { data, error } = await supabase.auth.signInWithPassword({
      email: 'carrebola_test_alumno1@gmail.com',
      password: '123456'
      })
      console.log('login', data);
    } catch (error) {
      console.log(error);
    }
  }
  
  await login()
