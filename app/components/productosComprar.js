export class ProductosComponente extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML = `
            <p>productos</p>
        `
    }
}

customElements.define('productos-component', ProductosComponente)