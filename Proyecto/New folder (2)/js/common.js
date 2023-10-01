var sunIcon = document.getElementById('sun-icon');
var moonIcon = document.getElementById('moon-icon');
var isDarkMode = false;

function toggleIcons() {
  if (isDarkMode) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

function toggleDarkMode() {
  var body = document.querySelector('body');
  body.classList.toggle('dark-mode');
  isDarkMode = !isDarkMode;
  toggleIcons();
}

toggleIcons(); // Mostrar el icono del modo actual al cargar la página