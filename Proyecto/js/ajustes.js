// Obtener referencias a los elementos del formulario
const colorFuenteInput = document.getElementById('colorElegido');
const colorFondoInput = document.getElementById('colorBgElegido');
const colorFondo2Input = document.getElementById('colorBg2Elegido');
const tamFuenteSelect = document.getElementById('tamFuente');

function updateUserName() {
  var userName = document.getElementById("userName").value;
  document.getElementById("userNameDisplay").innerHTML = userName;
  localStorage.setItem("userName", userName); // Guardar el nombre en el localStorage
}

function aplicarCambios() {
  const colorFuente = colorFuenteInput.value;
  const colorFondo = colorFondoInput.value;
  const colorFondo2 = colorFondo2Input.value;
  const tamFuente = tamFuenteSelect.value;

  // Aplicar los cambios de apariencia en el modo oscuro (dark mode)
  if (document.body.classList.contains('dark-mode')) {
    document.documentElement.style.setProperty('--color-fuente-dark', colorFuente);
    document.documentElement.style.setProperty('--color-fondo-dark', colorFondo);
    document.documentElement.style.setProperty('--color-fondo2-dark', colorFondo2);
    document.documentElement.style.setProperty('--tam-fuente-dark', tamFuente);
  }

  // Guardar los valores en localStorage correspondiente al modo oscuro
  localStorage.setItem('colorFuenteDark', colorFuente);
  localStorage.setItem('colorFondoDark', colorFondo);
  localStorage.setItem('colorFondo2Dark', colorFondo2);
  localStorage.setItem('tamFuenteDark', tamFuente);

  // Mostrar mensaje de éxito
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = 'Los cambios se han aplicado correctamente.';
}

function toggleDarkMode() {
  var body = document.querySelector('body');
  body.classList.toggle('dark-mode');

  // Almacenar el estado del modo oscuro en localStorage
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));

  var sunIcon = document.getElementById('sun-icon');
  var moonIcon = document.getElementById('moon-icon');

  if (body.classList.contains('dark-mode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

window.onload = function() {
  var userName = localStorage.getItem("userName");
  var userNameDisplay = document.getElementById("userNameDisplay");

  if (userName) {
    userNameDisplay.innerHTML = userName;
  }


  var body = document.querySelector('body');
  var sunIcon = document.getElementById('sun-icon');
  var moonIcon = document.getElementById('moon-icon');
  var tamFuenteSelect = document.getElementById('tamFuente');

  // Verificar el estado del modo oscuro almacenado en localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    // Aplicar el modo oscuro
    body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    // Aplicar el modo claro
    body.classList.remove('dark-mode');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }

  // Aplicar los ajustes de modo oscuro almacenados en localStorage
  const colorFuente = localStorage.getItem('colorFuenteDark');
  const colorFondo = localStorage.getItem('colorFondoDark');
  const colorFondo2 = localStorage.getItem('colorFondo2Dark');
  const tamFuente = localStorage.getItem('tamFuenteDark');

  if (colorFuente) {
    document.documentElement.style.setProperty('--color-fuente-dark', colorFuente);
  }
  if (colorFondo) {
    document.documentElement.style.setProperty('--color-fondo-dark', colorFondo);
  }
  if (colorFondo2) {
    document.documentElement.style.setProperty('--color-fondo2-dark', colorFondo2);
  }
  if (tamFuente) {
    body.style.fontSize = tamFuente + 'em';
    tamFuenteSelect.value = tamFuente;
  }

  // Comprobamos si estamos en la página de ajustes para evitar errores
  if (document.location.pathname.endsWith('ajustes.html')) {
    // Cargamos los valores almacenados en los campos correspondientes
    if (colorFuente) {
      colorFuenteInput.value = colorFuente;
    }
    if (colorFondo) {
      colorFondoInput.value = colorFondo;
    }
    if (colorFondo2) {
      colorFondo2Input.value = colorFondo2;
    }
    if (tamFuente) {
      tamFuenteSelect.value = tamFuente;
    }
  }

  // Agregar evento onchange para el tamaño de fuente
  tamFuenteSelect.addEventListener('change', cambiarTamFuente);
};

function cambiarTamFuente() {
  var tamFuenteSelect = document.getElementById('tamFuente');
  var tamFuente = tamFuenteSelect.value;
  var body = document.querySelector('body');
  body.style.fontSize = tamFuente + 'em';
}

