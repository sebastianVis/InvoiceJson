class ProductosTable extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        // Crear la tabla donde se mostrarán los productos
        this.innerHTML = `
            <table>
            <style>
            @import "../css/styleTable.css";
            </style>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="productosBody">
                    <!-- Aquí se llenarán las filas de productos -->
                </tbody>
            </table>
        `;

        // Llamar a la función para mostrar los productos
        await this.cargarProductos();
    }

    async cargarProductos() {
        const productos = await this.obtenerProductos();
        const productosBody = this.querySelector('#productosBody');
        
        // Limpiar cualquier contenido previo
        productosBody.innerHTML = '';

        // Crear una fila de tabla para cada producto
        productos.forEach(producto => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.stock}</td>
                <td>${producto.price}</td>
                <td><img src="${producto.img}" alt="${producto.nombre}" width="50"></td>
                <td><button class="delete-btn" data-id="${producto.id}">Eliminar</button></td>
            `;
            
            // Añadir la fila a la tabla
            productosBody.appendChild(row);
        });

        // Agregar los event listeners para los botones de eliminar
        this.agregarListenersEliminar();
    }

    async obtenerProductos() {
        try {
            const response = await fetch("http://localhost:3000/productos");
            if (!response.ok) {
                throw new Error('No se pudieron obtener los productos');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async eliminarProducto(id) {
        try {
            const response = await fetch(`http://localhost:3000/productos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Producto con ID ${id} eliminado`);
                // Después de eliminar, recargamos los productos
                this.cargarProductos();
            } else {
                console.error(`Error al eliminar el producto con ID ${id}`);
            }
        } catch (error) {
            console.error('Error al realizar la eliminación:', error);
        }
    }

    agregarListenersEliminar() {
        // Seleccionamos todos los botones de eliminar y agregamos un listener
        const botonesEliminar = this.querySelectorAll('.delete-btn');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const idProducto = e.target.dataset.id;
                this.eliminarProducto(idProducto);
            });
        });
    }
}

// Definir el componente custom
customElements.define('productos-table', ProductosTable);