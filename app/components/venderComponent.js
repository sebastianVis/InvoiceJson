export class VenderComponente extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML = `
            <p>a</p>
        `
    }
}

customElements.define('vender-component', VenderComponente)