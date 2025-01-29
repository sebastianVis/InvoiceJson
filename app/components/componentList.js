class ComponentNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // console.log(':v')
    this.innerHTML = `
        <div class="navbar">
            <li class="nav" id="vender" data-verocultar= '["v"]'>Vender</li>
            <li class="nav" id="productos" data-verocultar= '["p"]'>Productos</li>
        </div>
        `;
    this.querySelectorAll(".nav").forEach((val, id) => {
      val.addEventListener("click", (e) => {
        let data = JSON.parse(e.target.dataset.verocultar);
        let mainContent = document.querySelector("navbar");
        mainContent.className = "main"
        mainContent.innerHTML = "";
        switch (data[0]) {
          case "v":
            mainContent.innerHTML = "<vender-component></vender-component>";
            break;
          case "p":
            mainContent.innerHTML = "<productos-component></productos-component>";
            break;
        };
        e.stopImmediatePropagation();
        e.preventDefault();
      });
    });
  }
}

customElements.define("header-element", ComponentNavbar);
