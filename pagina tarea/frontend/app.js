// ==================== API BASE ====================
const API_URL = 'http://localhost:3000/api';

// ==================== FUNCIONES PARA OBTENER DATOS ====================

async function cargarClientes() {
    try {
        const res = await fetch(`${API_URL}/clientes`);
        const data = await res.json();
        clientes = data;
        renderizarClientes();
    } catch (error) {
        console.error('Error cargando clientes:', error);
    }
}

async function cargarProductos() {
    try {
        const res = await fetch(`${API_URL}/productos`);
        const data = await res.json();
        productos = data;
        renderizarProductos();
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

async function cargarVentas() {
    try {
        const res = await fetch(`${API_URL}/ventas`);
        const data = await res.json();
        ventas = data;
        renderizarVentas();
    } catch (error) {
        console.error('Error cargando ventas:', error);
    }
}

// ==================== DATOS EN MEMORIA ====================
let clientes = [];
let productos = [];
let ventas = [];

// ==================== FUNCIONES PARA RENDERIZAR TABLAS ====================

function renderizarClientes() {
    const tbody = document.getElementById('tablaClientes');
    if (!tbody) return;
    
    tbody.innerHTML = clientes.map((c) => `
        <tr>
            <td><strong>${c.id}</strong></td>
            <td>${c.nombre}</td>
            <td>${c.direccion}</td>
            <td>${c.telefono || '—'}</td>
            <td>${c.ciudad}</td>
            <td>
                <button class="btn-accion btn-eliminar" onclick="eliminarCliente('${c.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');

    const contador = document.getElementById('contadorClientes');
    if (contador) {
        contador.textContent = `${clientes.length} clientes`;
    }
}

function renderizarProductos() {
    const tbody = document.getElementById('tablaProductos');
    if (!tbody) return;
    
    tbody.innerHTML = productos.map(p => `
        <tr>
            <td><strong>${p.id}</strong></td>
            <td>${p.nombre}</td>
            <td>${p.descripcion}</td>
            <td>$${parseFloat(p.precio).toFixed(2)}</td>
            <td>
                <button class="btn-accion btn-eliminar" onclick="eliminarProducto('${p.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');

    const contador = document.getElementById('contadorProductos');
    if (contador) {
        contador.textContent = `${productos.length} productos`;
    }
}

function renderizarVentas() {
    const tbody = document.getElementById('tablaVentas');
    if (!tbody) return;
    
    tbody.innerHTML = ventas.map(v => `
        <tr>
            <td><strong>${v.id}</strong></td>
            <td>${v.cantidad}</td>
            <td>${v.cliente_id}</td>
            <td>${v.producto_id}</td>
            <td>
                <button class="btn-accion btn-eliminar" onclick="eliminarVenta('${v.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');

    const contador = document.getElementById('contadorVentas');
    if (contador) {
        contador.textContent = `${ventas.length} ventas`;
    }
}

// ==================== FUNCIONES PARA AGREGAR REGISTROS ====================

async function agregarCliente(event) {
    event.preventDefault();
    
    const id = document.getElementById('cliId').value.trim();
    const nombre = document.getElementById('cliNombre').value.trim();
    const direccion = document.getElementById('cliDireccion').value.trim();
    const telefono = document.getElementById('cliTelefono').value.trim();
    const ciudad = document.getElementById('cliCiudad').value.trim();

    if (!id || !nombre || !direccion || !ciudad) {
        alert('⚠️ Todos los campos excepto teléfono son obligatorios');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nombre, direccion, telefono, ciudad })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            alert(`⚠️ ${data.error}`);
            return;
        }
        
        await cargarClientes();
        document.getElementById('formCliente').reset();
        alert('✅ Cliente agregado correctamente');
    } catch (error) {
        alert('❌ Error al agregar cliente');
        console.error(error);
    }
}

async function agregarProducto(event) {
    event.preventDefault();
    
    const id = document.getElementById('prodId').value.trim();
    const nombre = document.getElementById('prodNombre').value.trim();
    const descripcion = document.getElementById('prodDescripcion').value.trim();
    const precio = parseFloat(document.getElementById('prodPrecio').value);

    if (!id || !nombre || !descripcion || isNaN(precio) || precio <= 0) {
        alert('⚠️ Todos los campos son obligatorios y el precio debe ser positivo');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nombre, descripcion, precio })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            alert(`⚠️ ${data.error}`);
            return;
        }
        
        await cargarProductos();
        document.getElementById('formProducto').reset();
        alert('✅ Producto agregado correctamente');
    } catch (error) {
        alert('❌ Error al agregar producto');
        console.error(error);
    }
}

async function agregarVenta(event) {
    event.preventDefault();
    
    const id = document.getElementById('ventaId').value.trim();
    const cantidad = parseInt(document.getElementById('ventaCantidad').value);
    const cliente_id = document.getElementById('ventaCliente').value.trim();
    const producto_id = document.getElementById('ventaProducto').value.trim();

    if (!id || isNaN(cantidad) || cantidad <= 0 || !cliente_id || !producto_id) {
        alert('⚠️ Todos los campos son obligatorios y cantidad debe ser mayor a 0');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/ventas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, cantidad, cliente_id, producto_id })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            alert(`⚠️ ${data.error}`);
            return;
        }
        
        await cargarVentas();
        document.getElementById('formVenta').reset();
        alert('✅ Venta registrada correctamente');
    } catch (error) {
        alert('❌ Error al registrar venta');
        console.error(error);
    }
}

// ==================== FUNCIONES PARA ELIMINAR ====================

async function eliminarCliente(id) {
    if (!confirm(`¿Estás seguro de eliminar al cliente ${id}?`)) return;
    
    try {
        const res = await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
        const data = await res.json();
        
        if (!res.ok) {
            alert(`⚠️ ${data.error}`);
            return;
        }
        
        await cargarClientes();
        alert('✅ Cliente eliminado');
    } catch (error) {
        alert('❌ Error al eliminar cliente');
        console.error(error);
    }
}

async function eliminarProducto(id) {
    if (!confirm(`¿Estás seguro de eliminar el producto ${id}?`)) return;
    
    try {
        const res = await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
        const data = await res.json();
        
        if (!res.ok) {
            alert(`⚠️ ${data.error}`);
            return;
        }
        
        await cargarProductos();
        alert('✅ Producto eliminado');
    } catch (error) {
        alert('❌ Error al eliminar producto');
        console.error(error);
    }
}

async function eliminarVenta(id) {
    if (!confirm(`¿Estás seguro de eliminar la venta ${id}?`)) return;
    
    try {
        const res = await fetch(`${API_URL}/ventas/${id}`, { method: 'DELETE' });
        const data = await res.json();
        
        if (!res.ok) {
            alert(`⚠️ ${data.error}`);
            return;
        }
        
        await cargarVentas();
        alert('✅ Venta eliminada');
    } catch (error) {
        alert('❌ Error al eliminar venta');
        console.error(error);
    }
}

// ==================== INICIALIZACIÓN ====================

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        cargarClientes(),
        cargarProductos(),
        cargarVentas()
    ]);

    const formCliente = document.getElementById('formCliente');
    const formProducto = document.getElementById('formProducto');
    const formVenta = document.getElementById('formVenta');

    if (formCliente) formCliente.addEventListener('submit', agregarCliente);
    if (formProducto) formProducto.addEventListener('submit', agregarProducto);
    if (formVenta) formVenta.addEventListener('submit', agregarVenta);
});

window.eliminarCliente = eliminarCliente;
window.eliminarProducto = eliminarProducto;
window.eliminarVenta = eliminarVenta;