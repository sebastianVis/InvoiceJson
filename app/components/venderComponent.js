export class VenderComponente extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const main = document.querySelector('main');
        main.innerHTML = ''
        this.innerHTML = `
            <div class="container">
    <form id="myForm">
      <h2>Información de la Factura</h2>
      <div class="form-group">
          <label for="identificacion">No. ID</label>
          <input type="text" class="form-control" name="identificacion" id="identificacion">
      </div>
      <div class="form-group">
          <label for="nombre">Nombres</label>
          <input type="text" class="form-control" name="nombre" id="nombre">
      </div>
      <div class="form-group">
          <label for="apellido">Apellidos</label>
          <input type="text" class="form-control" name="apellido" id="apellido">
      </div>
      <div class="form-group">
          <label for="direccion">Dirección</label>
          <input type="text" class="form-control" name="direccion" id="direccion">
      </div>
      <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" name="email" id="email">
      </div>
    </form>


      <h2>Productos</h2>
      <product-componentsell></product-componentsell>

      <h2>Resumen de la Compra</h2>
      <table id="table" class="table table-bordered">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Valor Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    
    <div class="summary" id="subTotalCard">
        <p>Subtotal: $<span id="subtotal" name="subtotal">0.00</span></p>
        <p>IVA (19%): $<span id="iva" name="iva">0.00</span></p>
        <p>Total: $<span id="total" name="total">0.00</span></p>
    </div>

    <button class="btnsuccess" id="payButton">Pagar</button>
  </div>
        `
        
    }
}

customElements.define('vender-component', VenderComponente)