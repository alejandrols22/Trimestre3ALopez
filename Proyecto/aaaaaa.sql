-- CREATE DATABASE ejercicio1trimestre3alopezdaw;

USE ejercicio1trimestre3alopezdaw;

CREATE TABLE IF NOT EXISTS cliente (
  email VARCHAR(255) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono INT
);

SELECT * FROM cliente;


-- CAMBIAR CONTRASEÑA A ADMIN