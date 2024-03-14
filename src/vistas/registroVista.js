import { User } from "../bd/user";
import { createClient } from '@supabase/supabase-js';

export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5 text-center">Registro</h1>
  <div class="m-5 mx-auto" style="max-width: 400px">
    <!-- Formulario de registro -->
    <form id="formularioRegistro" class="form border shadow-sm p-3" novalidate>
      <!-- Nombre -->
      <label for="nombre" class="form-label">Nombre:</label>
      <input required id="nombre" type="text" class="form-control" />

      <!-- Apellidos -->
      <label for="apellidos" class="form-label">Apellidos:</label>
      <input id="apellidos" type="text" class="form-control" />

      <!-- Email -->
      <label for="email" class="form-label">Email:</label>
      <input required id="email" type="email" class="form-control" />

      <!-- Contraseña -->
      <label for="pass" class="form-label mt-3">Contraseña:</label>
      <input required id="pass" type="password" class="form-control" />

      <!-- Botón enviar -->
      <input type="submit" class="btn btn-primary w-100 mt-3" value="Enviar" />
    </form>
  </div>
</div>
  `,
  script: () => {
   // Create Supabase client
const supabaseUrl = 'https://iptfrufzwzfwuapvfyrn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdGZydWZ6d3pmd3VhcHZmeXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NDg0OTcsImV4cCI6MjAyMzQyNDQ5N30.UydoircvwWJfaMoNj-2q9dd6VMKkv764PWTO7htLLEs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle form submission
document.getElementById('formularioRegistro').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get input values
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;

  // Call the handleSignUp function
  handleSignUp(nombre, apellidos, email, password);
});

// SignUp function
async function handleSignUp(nombre, apellidos, email, password) {
  try {
    // Perform the sign-up request
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error al registrar usuario:', error.message, error);
      return;
    }

    console.log('Usuario después del registro:', data);

    // Create an entry in the 'usuarios' table only if the signup is successful
    const { data: dbData, error: dbError } = await supabase
      .from('perfiles')
      .insert([
        {
          name: nombre,
          apellidos: apellidos,
          email: email,
          rol: 'registrado',
        },
      ]);

    if (dbError) {
      console.error('Error al insertar usuario en la base de datos:', dbError.message);
      return;
    }

    console.log('Usuario registrado y añadido a la base de datos:', data);
    console.log(dbData);
    // Redirect to the sign-in page
    window.location.href = '/signin';
  } catch (error) {
    console.error('Error general:', error.message);
  }
}

  },
};