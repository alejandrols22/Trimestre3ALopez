<?php
// Configuración de conexión a la base de datos
$servername = "localhost:3306";
$username = "root";
$password = "tAHFUlUA1@";
$dbname = "proyecto1db";
// Crear una conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión es exitosa
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Si la conexión es exitosa, imprimir un mensaje
echo "Conexión exitosa";

// Comprobar si se ha enviado el formulario
if (isset($_POST['nombre']) && isset($_POST['password'])) {

  // Recuperar los valores del formulario
  $nombre = $_POST['nombre'];
  $password = $_POST['password'];

  // Crear una consulta para buscar al usuario en la base de datos
  $query = "SELECT * FROM usuarios WHERE nombre = '$nombre' AND password = '$password'";

  // Ejecutar la consulta
  $result = mysqli_query($conn, $query);

  // Verificar si se encontró un registro con el usuario y la contraseña
  if (mysqli_num_rows($result) == 1) {
    // Iniciar sesión
    session_start();
    $_SESSION['nombre'] = $nombre;

    // Redirigir al usuario a la página principal
    header('Location: contacto.html');
    exit;
  } else {
    // Mostrar un mensaje de error si el usuario y/o la contraseña son incorrectos
    $error = "Usuario y/o contraseña incorrectos";
  }
}
?>