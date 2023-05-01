<?php
$servername = "localhost:3306";
$username = "root";
$password = "tAHFUlUA1@";
$dbname = "proyecto1db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $nombre = $_POST['nombre'];
  $apellido = $_POST['apellido'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Verificar si el email ya está registrado
  $sql = "SELECT * FROM usuarios WHERE email = '$email'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    echo "El email ya está registrado";
  } else {
    // Insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ('$nombre', '$apellido', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
      echo "Registro exitoso";
    } else {
      echo "Error al registrar: " . $conn->error;
    }
  }
}

$conn->close();
?>