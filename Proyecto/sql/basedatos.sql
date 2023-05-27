CREATE DATABASE IF NOT EXISTS proyecto1db;

USE proyecto1db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
-- INSERT INTO usuarios (nombre, apellido, email, password) VALUES ('Juan',' Perez','juan.perez@example.com', 'contraseña123');

SELECT * FROM usuarios;

CREATE TABLE IF NOT EXISTS ejercicios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  musculo VARCHAR(255),
  nombre VARCHAR(255),
  descripcion VARCHAR(255)
  
);




