-- Crear la base de datos
CREATE DATABASE sistema_ventas;
USE sistema_ventas;

-- Tabla clientes
CREATE TABLE clientes (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20),
    ciudad VARCHAR(50) NOT NULL
);

-- Tabla productos
CREATE TABLE productos (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL
);

-- Tabla ventas
CREATE TABLE ventas (
    id VARCHAR(10) PRIMARY KEY,
    cantidad INT NOT NULL,
    cliente_id VARCHAR(10) NOT NULL,
    producto_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Insertar datos de prueba
INSERT INTO clientes VALUES 
('C001', 'Juan Pérez', 'Calle 123', '555-1234', 'Bogotá'),
('C002', 'María Gómez', 'Av. Principal 456', '', 'Medellín'),
('C003', 'Carlos López', 'Carrera 7 #45-67', '555-9876', 'Cali');

INSERT INTO productos VALUES 
('P001', 'Laptop', 'Laptop de última generación, 16GB RAM', 1200.00),
('P002', 'Mouse', 'Mouse inalámbrico Bluetooth', 25.50),
('P003', 'Teclado', 'Teclado mecánico RGB', 85.00);

INSERT INTO ventas VALUES 
('V001', 2, 'C001', 'P001'),
('V002', 5, 'C002', 'P002'),
('V003', 1, 'C003', 'P003');