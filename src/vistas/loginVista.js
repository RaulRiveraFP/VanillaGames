export default {
    template: // html
    `
    <div class="container">
    <h1 class="mt-5 text-center">Inicia sesión</h1>
    <div class="m-5 mx-auto" style="max-width: 400px">
        <form action="" class="form border shadow-sm p-3">
            <label for="email" class="form-label">Email:</label>
            <input type="text" id="email"  name="email" class="form-control" />
            <label for="pass" class="form-label mt-3">Contraseña:</label>
            <input id="pass" name="pass" type="password" class="form-control" />
            <div class="form-check mt-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                />
                <label class="form-check-label" for="flexCheckChecked">
                    Recordar sesión
                </label>
            </div>
            <a class="d-block text-end" href="#">¿Has olvidado tu contraseña?</a>
            <a class="btn btn-primary w-100 mt-3" href="proyectos.html">Iniciar sesión</a>
        </form>
        <a class="d-block mt-5 btn btn-secondary mx-auto" href="registro.html"
            >¿Eres nuevo? Regístrate</a
        >
    </div>
</div>
    `
    ,script: () =>{
       // Función para enviar datos a la bd
    function enviarDatos (formulario) {
        const email = formulario.email.value
        const pass = formulario.password.value
  
        // buscamos el indice del email en el array perfiles
        const indexUser = perfiles.findIndex((user) => user.email === email) // 1
        // Si encuentra un usuario
        if (indexUser > 0) {
          // Si la contraseña es correcta
          if (perfiles[indexUser].contraseña === pass) {
            console.log('¡login correcto!')
            const usuario = {
              nombre: perfiles[indexUser].nombre,
              apellidos: perfiles[indexUser].apellidos,
              email: perfiles[indexUser].email,
              rol: perfiles[indexUser].rol,
              avatar: perfiles[indexUser].avatar,
              user_id: perfiles[indexUser].user_id
            }
            // Guardamos datos de usaurio en localstorage
            ls.setUsuario(usuario)
            // Cargamos página home
            window.location = '#/proyectos'
            // Actualizamos el header para que se muestren los menús que corresponden al rol
            header.script()
          } else {
            // console.log('La contraseña no corresponde')
            alert('El usuario no existe o la contraseña no es correcta')
          }
        } else {
          // console.log('El usuario no existe')
          alert('El usuario no existe o la contraseña no es correcta')
        }
      }
    }
}