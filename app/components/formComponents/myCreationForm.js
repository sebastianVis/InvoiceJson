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
            <label>Image <input type="text"></label>
        </form>
        `;
        const frmCreation = document.querySelector('#myCrationForm');
        


    }
}
customElements.define('creation-form', CreationForm);