-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS mydb
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mydb;

-- ============================
-- TABLA CLIENTES
-- ============================
CREATE TABLE IF NOT EXISTS clientes (
    idclientes INT AUTO_INCREMENT PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    apellido   VARCHAR(100) NOT NULL,
    dni        VARCHAR(20)  UNIQUE NOT NULL,
    telefono   VARCHAR(30),
    email      VARCHAR(120),
    direccion  VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================
-- TABLA PRODUCTOS
-- ============================
CREATE TABLE IF NOT EXISTS productos (
    idproductos INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(120) NOT NULL,
    descripcion TEXT,
    precio      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock       INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================
-- TABLA VENTAS
-- ============================
CREATE TABLE IF NOT EXISTS ventas (
    idventas      INT AUTO_INCREMENT PRIMARY KEY,
    idclientes    INT NOT NULL,
    idproductos   INT NOT NULL,
    cantidad      INT NOT NULL DEFAULT 1,
    total         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    fecha         DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ventas_clientes
        FOREIGN KEY (idclientes) REFERENCES clientes(idclientes)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ventas_productos
        FOREIGN KEY (idproductos) REFERENCES productos(idproductos)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================
-- DATOS DE PRUEBA
-- ============================
INSERT INTO clientes (nombre, apellido, dni, telefono, email, direccion) VALUES
('Fabio',   'Pérez',   '30111222', '3814567890', 'fabio@mail.com',  'Av. Siempre Viva 742'),
('Lucía',   'Gómez',   '28999888', '3814445566', 'lucia@mail.com',  'Calle Falsa 123'),
('Martín',  'Rodríguez','33444555','3815556677', 'martin@mail.com', 'Belgrano 456'),
('Sofía',   'Fernández','31777888','3816667788', 'sofia@mail.com',  'San Martín 789');

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Coca Cola 1.5L', 'Gaseosa sabor cola',       1500.00, 50),
('Pan lactal',      'Pan de molde integral',    900.00, 30),
('Leche entera 1L', 'Leche larga vida',        1200.00, 40),
('Arroz 1kg',       'Arroz largo fino',         800.00, 60);

INSERT INTO ventas (idclientes, idproductos, cantidad, total) VALUES
(1, 1, 2, 3000.00),
(2, 3, 1, 1200.00),
(3, 2, 3, 2700.00);