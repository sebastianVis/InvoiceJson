export class ProductosComponente extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <div class="listBtn">
            <a href="#" class="btnProd btnCrear" id="btnCrear" data-hideon='[["#btnEditar","#btnEliminar"],["#btnCrear","#btnList"]]'>Crear</a>
            <a href="#" class="btnProd btnEditar" id="btnEditar" data-hideon='[["#btnEliminar"],["#btnCrear","#btnEditar","#btnList"]]'>Editar</a>
            <a href="#" class="btnProd btnEliminar" id="btnEliminar" data-hideon='[["#btnCrear"],["#btnEditar","#btnEliminar","#btnList"]]'>Eliminar</a>
            <a href="#" class="btnProd btnList" id="btnList" data-hideon='[["#btnCrear","#btnEliminar"],["#btnEditar","#btnList"]]'>Listar</a>
        </div>
    `;
    this.querySelector("#btnCrear").addEventListener("click", (e) => {
        const creationForm = document.createElement("div");
        const mainContainer = document.querySelector("main")
        creationForm.className = 'formCreation'
        mainContainer.innerHTML = '';
        creationForm.innerHTML= '<creation-form></creation-form>'
        mainContainer.appendChild(creationForm)
    })

    this.querySelector("#btnEditar").addEventListener("click", (e) => {
        const creationForm = document.createElement("div");
        const mainContainer = document.querySelector("main")
        creationForm.className = 'formCreation'
        mainContainer.innerHTML = '';
        creationForm.innerHTML= '<edit-form></edit-form>'
        mainContainer.appendChild(creationForm)
    }) 

    this.querySelector("#btnEliminar").addEventListener("click", (e) => {
        const creationForm = document.createElement("div");
        const mainContainer = document.querySelector("main")
        creationForm.className = 'deleteTable'
        mainContainer.innerHTML = '';
        creationForm.innerHTML= '<productos-table></productos-table>'
        mainContainer.appendChild(creationForm)
    }) 
    }


}

customElements.define('productos-component', ProductosComponente)