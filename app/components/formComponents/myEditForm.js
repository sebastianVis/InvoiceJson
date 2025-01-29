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
            let textSearch = e.target.value; // 
            const result = await this.searchProduct(textSearch)
            if (result) {
                this.editForm(result);
            } else {
                this.clearForm();
            }
        });
    
        this.querySelector('#myCreationForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target); //  Se crea una costante para almacenar el evento que contiene todo el formulario.
            console.log(formData)
            const productData = Object.fromEntries(formData); // Enviar datos editados con PATCH
            productData.id = this.querySelector('input[name="id"]').value;
            await this.updateProduct(productData);
            
        });

        
        
    }

    async searchProduct(query){
        const url = "http://localhost:3000/productos/";
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(producto => producto.nombre.toLowerCase().includes(query.toLowerCase()));
        console.log(result)
        return result.length > 0 ? result[0] : null;
    }

    editForm(product){
        this.querySelector('input[name="id"]').value = product.id;
        this.querySelector('input[name="nombre"]').value = product.nombre;
        this.querySelector('input[name="stock"]').value = product.stock;
        this.querySelector('input[name="price"]').value = product.price;
        this.querySelector('input[name="img"]').value = product.img;
    }

    clearForm() {
        this.querySelector('input[name="id"]').value = "";
        this.querySelector('input[name="nombre"]').value = "";
        this.querySelector('input[name="stock"]').value = "";
        this.querySelector('input[name="price"]').value = "";
        this.querySelector('input[name="img"]').value = "";
    }

    async updateProduct (productData) {
        try {
            const response = await fetch(`http://localhost:3000/productos/${productData.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
    
            if (!response.ok) throw new Error("Error al actualizar el producto");
            alert('Producto actualizado correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el producto');
        }
        }

}


//funcion que realiza el llamado al JSON


    

customElements.define('edit-form', EditForm)
