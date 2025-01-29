class ListComponents extends HTMLElement{
    constructor(){
        super();
    }
    async connectedCallback(){
        this.innerHTML = `
        <div id= "productsList">
        </div>
        `;

        await this.cargarProductos();
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

    async cargarProductos(){
        const productos = await this.obtenerProductos();
        const productsList = this.querySelector('#productsList')
        productsList.innerHTML = '';
        productos.forEach(producto => {
            const card = document.createElement('card-product')
            card.className = 'card-product'
            card.innerHTML = `
            <img class="card__img" src="${producto.img}" alt="">
            <div class="product__name"><h1 class="title">${producto.nombre}</h1></div>
            <div class="product__id"><h1 class="p">ID = ${producto.id}</h1></div>
            <div class="product__price"><h1 class="p">${producto.price}</h1></div>
            `;
            productsList.appendChild(card);
        });
    }
}
customElements.define('productos-list', ListComponents)
