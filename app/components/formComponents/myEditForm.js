class EditForm extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML = `
        <form id="myCreationForm">
            <label>Buscar <input type="text" id="buscarEditar"></label>
            <label>Codigo <input type="text" name="id" disabled></label>
            <label>Nombre <input type="text" name="nombre"></label>
            <label>Stock <input type="number" name="stock"></label>
            <label>Price <input type="number" name="price"></label>
            <label>Image <input type="text" name="img"></label>
            <button type="submit">Enviar</button>
        </form>
        `;
        this.querySelector('#buscarEditar').addEventListener('input' , async (e) =>{
            let textSearch = e.target.value;
            const result = await this.searchProduct(textSearch)
        });
    
        this.querySelector('#myCreationForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const productData = Object.fromEntries(formData);
            
            // Enviar datos editados con PATCH
            await this.updateProduct(productData);
        });

        
        
    }

    async searchProduct(query){
        const url = "http://localhost:3000/productos/";
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(producto => producto.nombre.toLowerCase().includes(query.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    populateForm(product){
        this.querySelector('input[name="id"]').value = product.id;
        this.querySelector('input[name="nombre"]').value = product.nombre;
        this.querySelector('input[name="stock"]').value = product.stock;
        this.querySelector('input[name="price"]').value = product.price;
        this.querySelector('input[name="img"]').value = product.img;
    }

    async updateProduct (productData) {
        let url = `http://localhost:3000/productos/${productData.id}`;
        const response = await fetch(url , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        if (response.ok) {
            alert('Producto actualizado correctamente');
        } else {
            alert('Error al actualizar el producto');
        }
        }

}


//funcion que realiza el llamado al JSON


    

customElements.define('edit-form', EditForm)
