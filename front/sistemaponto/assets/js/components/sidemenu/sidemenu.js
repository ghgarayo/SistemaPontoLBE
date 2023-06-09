let itemsSideMenu = [];

// Verificar se o usuário está logado e é um admin
if (decodedPayload && decodedPayload.admin) {
  itemsSideMenu = [
    {
      name: "Home",
      url: "/pages/home.html",
      icon: "home",
    },
    {
      name: "Relatório de Ponto",
      url: "/pages/relatorioponto.html",
      icon: "list",
    },
    {
      name: "Cadastrar Funcionário",
      url: "/pages/cadastrofuncionario.html",
      icon: "cadastro-funcionario",
    },
    {
      name: "Funcionários",
      url: "/pages/funcionarios.html",
      icon: "funcionarios",
    },
    {
      name: "Ponto Funcionários",
      url: "/pages/pontofuncionarios.html",
      icon: "list",
    },
    {
      name: "Solicitações Ajustes",
      url: "/pages/solicitacoesajustes.html",
      icon: "ajuste-calendario",
    },
  ];
} else {
  itemsSideMenu = [
    {
      name: "Home",
      url: "/pages/home.html",
      icon: "home",
    },
    {
      name: "Relatório de Ponto",
      url: "/pages/relatorioponto.html",
      icon: "list",
    },
  ];
}

function handleSideMenu() {
  var sideMenu = document.querySelector(".side-menu");
  sideMenu.classList.toggle("collapsed");
}

let sideMenu = () => {
  let html = `
              <ul class = \"side-menu-list\">
               `;
  itemsSideMenu.forEach(
    (item) =>
      (html += `
                  <li class = \"side-menu-item\"> 
                      <a class = \"side-menu-link\" href= \"${item.url}\"> 
                          <img class= \"side-item-icon\" src=\"/assets/img/${item.icon}.svg\">
                          <span class = \"item-name"\> 
                            ${item.name}  
                          </span>
                      </a>
                  </li>
                `)
  );
  html += `
                  <li class="side-menu-item"> 
                  <a class="side-menu-link" href="/" onclick="clearStorageAndRedirect()"> 
                    <img class="side-item-icon" src="/assets/img/sair.svg">
                    <span class="item-name"> 
                      Sair  
                    </span>
                  </a>
                </li> 
              </ul>           
          `;

  return html;
};

document.querySelector(".side-menu").innerHTML = sideMenu();
