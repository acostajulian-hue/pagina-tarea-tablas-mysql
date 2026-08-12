// ==================== DATOS DE PRUEBA ====================
let clientes = [
    { id: 'C001', nombre: 'Juan Pérez', direccion: 'Calle 123', telefono: '555-1234', ciudad: 'Bogotá' },
    { id: 'C002', nombre: 'María Gómez', direccion: 'Av. Principal 456', telefono: '', ciudad: 'Medellín' },
    { id: 'C003', nombre: 'Carlos López', direccion: 'Carrera 7 #45-67', telefono: '555-9876', ciudad: 'Cali' }
];

let productos = [
    { id: 'P001', nombre: 'Laptop', descripcion: 'Laptop de última generación, 16GB RAM', precio: 1200.00 },
    { id: 'P002', nombre: 'Mouse', descripcion: 'Mouse inalámbrico Bluetooth', precio: 25.50 },
    { id: 'P003', nombre: 'Teclado', descripcion: 'Teclado mecánico RGB', precio: 85.00 }
];

let ventas = [
    { id: 'V001', cantidad: 2, cliente_id: 'C001', producto_id: 'P001' },
    { id: 'V002', cantidad: 5, cliente_id: 'C002', producto_id: 'P002' },
    { id: 'V003', cantidad: 1, cliente_id: 'C003', producto_id: 'P003' }
];

// ==================== FUNCIONES PARA RENDERIZAR TABLAS ====================

function renderizarClientes() {
    const tbody = document.getElementById('tablaClientes');
    if (!tbody) return;
    
    tbody.innerHTML = clientes.map((c, index) => `
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
            <td>$${p.precio.toFixed(2)}</td>
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

function agregarCliente(event) {
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

    if (clientes.find(c => c.id === id)) {
        alert('⚠️ Ya existe un cliente con ese ID');
        return;
    }

    clientes.push({ id, nombre, direccion, telefono, ciudad });
    renderizarClientes();
    document.getElementById('formCliente').reset();
    alert('✅ Cliente agregado correctamente');
}

function agregarProducto(event) {
    event.preventDefault();
    
    const id = document.getElementById('prodId').value.trim();
    const nombre = document.getElementById('prodNombre').value.trim();
    const descripcion = document.getElementById('prodDescripcion').value.trim();
    const precio = parseFloat(document.getElementById('prodPrecio').value);

    if (!id || !nombre || !descripcion || isNaN(precio) || precio <= 0) {
        alert('⚠️ Todos los campos son obligatorios y el precio debe ser positivo');
        return;
    }

    if (productos.find(p => p.id === id)) {
        alert('⚠️ Ya existe un producto con ese ID');
        return;
    }

    productos.push({ id, nombre, descripcion, precio });
    renderizarProductos();
    document.getElementById('formProducto').reset();
    alert('✅ Producto agregado correctamente');
}

function agregarVenta(event) {
    event.preventDefault();
    
    const id = document.getElementById('ventaId').value.trim();
    const cantidad = parseInt(document.getElementById('ventaCantidad').value);
    const cliente_id = document.getElementById('ventaCliente').value.trim();
    const producto_id = document.getElementById('ventaProducto').value.trim();

    if (!id || isNaN(cantidad) || cantidad <= 0 || !cliente_id || !producto_id) {
        alert('⚠️ Todos los campos son obligatorios y cantidad debe ser mayor a 0');
        return;
    }

    if (ventas.find(v => v.id === id)) {
        alert('⚠️ Ya existe una venta con ese ID');
        return;
    }

    if (!clientes.find(c => c.id === cliente_id)) {
        alert('⚠️ El cliente no existe');
        return;
    }
    if (!productos.find(p => p.id === producto_id)) {
        alert('⚠️ El producto no existe');
        return;
    }

    ventas.push({ id, cantidad, cliente_id, producto_id });
    renderizarVentas();
    document.getElementById('formVenta').reset();
    alert('✅ Venta registrada correctamente');
}

// ==================== FUNCIONES PARA ELIMINAR ====================

function eliminarCliente(id) {
    if (!confirm(`¿Estás seguro de eliminar al cliente ${id}?`)) return;
    clientes = clientes.filter(c => c.id !== id);
    renderizarClientes();
    alert('✅ Cliente eliminado');
}

function eliminarProducto(id) {
    if (!confirm(`¿Estás seguro de eliminar el producto ${id}?`)) return;
    productos = productos.filter(p => p.id !== id);
    renderizarProductos();
    alert('✅ Producto eliminado');
}

function eliminarVenta(id) {
    if (!confirm(`¿Estás seguro de eliminar la venta ${id}?`)) return;
    ventas = ventas.filter(v => v.id !== id);
    renderizarVentas();
    alert('✅ Venta eliminada');
}

// ==================== INICIALIZACIÓN ====================

document.addEventListener('DOMContentLoaded', () => {
    // Renderizar todas las tablas
    renderizarClientes();
    renderizarProductos();
    renderizarVentas();

    // Asignar eventos solo si existen los formularios
    const formCliente = document.getElementById('formCliente');
    const formProducto = document.getElementById('formProducto');
    const formVenta = document.getElementById('formVenta');

    if (formCliente) formCliente.addEventListener('submit', agregarCliente);
    if (formProducto) formProducto.addEventListener('submit', agregarProducto);
    if (formVenta) formVenta.addEventListener('submit', agregarVenta);
});

// Hacer funciones globales para usar en HTML (onclick)
window.eliminarCliente = eliminarCliente;
window.eliminarProducto = eliminarProducto;
window.eliminarVenta = eliminarVenta;