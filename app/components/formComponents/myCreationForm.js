class CreationForm extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <form id="myCreationForm">
            <label>Codigo <input type="text" name="id"></label>
            <label>Nombre <input type="text" name="nombre"></label>
            <label>Stock <input type="number" name="stock"></label>
            <label>Price <input type="number" name="price"></label>
            <label>Image <input type="text" name="img"></label>
            <button type="submit">Enviar</button>
        </form>
        `;
        document.querySelector("#myCreationForm").addEventListener("submit", async (e) => {
            e.preventDefault(); // Evita el envío por defecto del formulario
        
            // 1. Capturar los datos del formulario
            console.log(':v')
            const formData = new FormData(e.target);
            const datos = Object.fromEntries(formData.entries()); // Convierte FormData en objeto
        
            // 2. Enviar los datos a JSON Server con POST
            try {
                const response = await fetch("http://localhost:3000/productos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });
                console.log("Producto creado:", nuevoProducto);
                alert("Producto agregado con éxito!");
                e.target.reset();
            } catch (error) {
                console.error("Error al enviar datos:", error);
            }
        });


    }
}
customElements.define('creation-form', CreationForm);