

USE ejercicioDAW050520023;
	/*
	CREATE TABLE clientes (
	ID INT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	direccion VARCHAR(255),
	correo_electronico VARCHAR(255) UNIQUE NOT NULL,
	numero_de_telefono VARCHAR(20) UNIQUE
	);
	
	CREATE TABLE productos (
	ID INT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	descripcion TEXT,
	precio DECIMAL(10, 2) NOT NULL,
	cantidad_en_stock INT NOT NULL
	);
	
	CREATE TABLE pedidos (
	ID INT PRIMARY KEY,
	id_cliente INT NOT NULL,
	fecha DATE NOT NULL,
	monto_total DECIMAL(10, 2) NOT NULL
	);

   
	CREATE TABLE detalles_pedidos (
	ID INT PRIMARY KEY,
	id_pedido INT NOT NULL,
	id_producto INT NOT NULL,
	cantidad INT NOT NULL,
	precio DECIMAL(10, 2) NOT NULL
	);

/*
	-- Insertar datos en la tabla clientes
		INSERT INTO clientes (ID, nombre, direccion, correo_electronico, numero_de_telefono)
		VALUES (1, 'Juan Perez', 'Calle 123, Ciudad A', 'juan.perez@email.com', '555-111-1111'),
		(2, 'Maria Garcia', 'Avenida 456, Ciudad B', 'maria.garcia@email.com', '555-222-2222'),
		(3, 'Carlos Rodriguez', 'Calle 789, Ciudad A', 'carlos.rodriguez@email.com', '555-333-3333'),
		(4, 'Laura Ramirez', 'Avenida 159, Ciudad C', 'laura.ramirez@email.com', '555-444-4444'),
		(5, 'Jose Torres', 'Calle 753, Ciudad B', 'jose.torres@email.com', '555-555-5555'),
		(6, 'Ana Lopez', 'Avenida 987, Ciudad A', 'ana.lopez@email.com', '555-666-6666'),
		(7, 'Sergio Gomez', 'Calle 654, Ciudad C', 'sergio.gomez@email.com', '555-777-7777');
		
		-- Insertar datos en la tabla productos
		INSERT INTO productos (ID, nombre, descripcion, precio, cantidad_en_stock)
		VALUES (1, 'Telefono movil', 'Telefono movil de gama media', 250.99, 100),
		(2, 'Tableta', 'Tableta para uso diario', 150.49, 50),
		(3, 'Auriculares', 'Auriculares inalambricos con cancelacion de ruido', 79.99, 200),
		(4, 'Smartwatch', 'Reloj inteligente con GPS y funciones de seguimiento', 199.99, 75),
		(5, 'Teclado', 'Teclado mecanico para gamers', 89.49, 150),
		(6, 'Mouse', 'Mouse inalambrico de alta precision', 49.99, 120),
		(7, 'Cargador portatil', 'Cargador portatil de alta capacidad', 39.99, 80);
		
		-- Insertar datos en la tabla pedidos
		INSERT INTO pedidos (ID, id_cliente, fecha, monto_total)
		VALUES (1, 1, '2023-01-02', 99.98),
		(2, 2, '2023-01-05', 150.49),
		(3, 3, '2023-01-08', 250.99),
		(4, 4, '2023-01-11', 120.98),
		(5, 5, '2023-01-14', 89.49),
		(6, 6, '2023-01-17', 49.99),
		(7, 7, '2023-01-20', 39.99),
		(8, 1, '2023-01-23', 79.99),
		(9, 2, '2023-01-26', 199.99),
		(10, 3, '2023-01-29', 330.98);
		
		-- Insertar datos en la tabla detalles_pedidos
		INSERT INTO detalles_pedidos (ID, id_pedido, id_producto, cantidad, precio)
		VALUES (1, 1, 3, 2, 49.99),
		(2, 2, 2, 1, 150.49),
		(3, 3, 1, 1, 250.99),
		(4, 4, 5, 1, 89.49),
		(5, 4, 6, 1, 31.49),
		(6, 5, 5, 1, 89.49),
		(7, 6, 6, 1, 49.99),
		(8, 7, 7, 1, 39.99),
		(9, 8, 3, 1, 79.99),
		(10, 9, 4, 1, 199.99),
		(11, 10, 1, 1, 250.99),
		(12, 10, 2, 1, 79.99);	
	*/
    -- 1.	Cambiar el nombre de la tabla "clientes" a "usuarios".
    -- ALTER TABLE clientes RENAME TO usuarios;
    -- 2.	Cambiar el nombre de la columna " correo_electronico " en la tabla "usuarios" a "email".
    -- ALTER TABLE usuarios CHANGE correo_electronico email VARCHAR(255);
    -- 3.	Eliminar la tabla "pedidos".
    -- DROP TABLE pedidos;
    -- 4.	Agregar una restricci n CHECK a la columna "precio" de la tabla "productos" que asegure que el precio sea mayor que 0.
    -- ALTER TABLE productos
	-- ADD CONSTRAINT check_precio_gt_0 CHECK (precio > 0);
    -- 5. Eliminar la relación entre las tablas "pedidos" y "productos" por medio de las claves foráneas.
    /*
    ALTER TABLE detalles_pedidos
	DROP COLUMN id_pedido,
	DROP COLUMN id_producto;

	ALTER TABLE detalles_pedidos
	ADD COLUMN id_pedido INT NOT NULL,
	ADD COLUMN id_producto INT NOT NULL;
	*/
    -- 6.   Volver a crear la relación entre las tablas "compras" y "productos" por medio de las claves foráneas
    /*
    DELETE FROM detalles_pedidos
	WHERE id_pedido = 0 OR id_producto = 0;
    
    ALTER TABLE detalles_pedidos
	ADD CONSTRAINT fk_detalles_pedidos_pedidos
	FOREIGN KEY (id_pedido) REFERENCES pedidos (ID),
	ADD CONSTRAINT fk_detalles_pedidos_productos
	FOREIGN KEY (id_producto) REFERENCES productos (ID);
	*/
	-- 7. Agregar una columna "telefono" a la tabla "usuarios" de tipo VARCHAR(20) y que no permita valores nulos.
   
/*   ALTER TABLE usuarios
	ADD telefono VARCHAR(20) NOT NULL;
*/
-- 8. Eliminar la columna "telefono" de la tabla "usuarios".
ALTER TABLE usuarios
DROP COLUMN telefono;

	
    

    
    
