const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('✅ Conectado a MySQL');
});

// ==================== RUTAS CLIENTES ====================

// Obtener todos los clientes
app.get('/api/clientes', (req, res) => {
    db.query('SELECT * FROM clientes ORDER BY id', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Agregar cliente
app.post('/api/clientes', (req, res) => {
    const { id, nombre, direccion, telefono, ciudad } = req.body;
    
    if (!id || !nombre || !direccion || !ciudad) {
        return res.status(400).json({ error: 'Todos los campos excepto teléfono son obligatorios' });
    }

    const query = 'INSERT INTO clientes (id, nombre, direccion, telefono, ciudad) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id, nombre, direccion, telefono || null, ciudad], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Ya existe un cliente con ese ID' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente agregado', id });
    });
});

// Eliminar cliente
app.delete('/api/clientes/:id', (req, res) => {
    db.query('DELETE FROM clientes WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado' });
    });
});

// ==================== RUTAS PRODUCTOS ====================

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos ORDER BY id', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Agregar producto
app.post('/api/productos', (req, res) => {
    const { id, nombre, descripcion, precio } = req.body;
    
    if (!id || !nombre || !descripcion || precio === undefined || precio <= 0) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y el precio debe ser positivo' });
    }

    const query = 'INSERT INTO productos (id, nombre, descripcion, precio) VALUES (?, ?, ?, ?)';
    db.query(query, [id, nombre, descripcion, precio], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Ya existe un producto con ese ID' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto agregado', id });
    });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
    db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado' });
    });
});

// ==================== RUTAS VENTAS ====================

// Obtener todas las ventas
app.get('/api/ventas', (req, res) => {
    db.query('SELECT * FROM ventas ORDER BY id', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Agregar venta
app.post('/api/ventas', (req, res) => {
    const { id, cantidad, cliente_id, producto_id } = req.body;
    
    if (!id || !cantidad || cantidad <= 0 || !cliente_id || !producto_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y cantidad debe ser mayor a 0' });
    }

    // Verificar que cliente existe
    db.query('SELECT id FROM clientes WHERE id = ?', [cliente_id], (err, clientes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (clientes.length === 0) {
            return res.status(400).json({ error: 'El cliente no existe' });
        }

        // Verificar que producto existe
        db.query('SELECT id FROM productos WHERE id = ?', [producto_id], (err, productos) => {
            if (err) return res.status(500).json({ error: err.message });
            if (productos.length === 0) {
                return res.status(400).json({ error: 'El producto no existe' });
            }

            // Insertar venta
            const query = 'INSERT INTO ventas (id, cantidad, cliente_id, producto_id) VALUES (?, ?, ?, ?)';
            db.query(query, [id, cantidad, cliente_id, producto_id], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ error: 'Ya existe una venta con ese ID' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Venta registrada', id });
            });
        });
    });
});

// Eliminar venta
app.delete('/api/ventas/:id', (req, res) => {
    db.query('DELETE FROM ventas WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta eliminada' });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});