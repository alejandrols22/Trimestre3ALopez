<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Configuración de conexión a la base de datos
$servername = "localhost:3306";
$username = "root";
$password = "admin1234qslia.xjl";
$dbname = "proyecto1db";

// Conexión a la base de datos
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verificar si la conexión es exitosa
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Si el formulario de registro es enviado
if (isset($_POST['submit'])) {
    // Capturar los datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validar que los campos no estén vacíos
    if (empty($nombre) || empty($apellido) || empty($email) || empty($password)) {
        echo "Por favor, completa todos los campos.";
    } else {
        // Verificar si el email ya existe en la base de datos
        $query = "SELECT * FROM usuarios WHERE email='$email'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            echo "Ya existe un usuario con ese email. Por favor, intenta con otro.";
        } else {
            // Insertar los datos del usuario en la tabla "usuarios"
            $query = "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ('$nombre', '$apellido', '$email', '$password')";
            $result = mysqli_query($conn, $query);

            if ($result) {
                echo "Te has registrado exitosamente.";
            } else {
                echo "Hubo un error al registrarte. Por favor, intenta de nuevo.";
            }
        }
    }
}
?>