const URL = "http://localhost:8080";

let token = sessionStorage.getItem("token");
let decodedPayload = "";

if (!token) {
  window.location.href = "/index.html";
} else {
  decodedPayload = JSON.parse(atob(token.split(".")[1]));
}

let usuario = {
  email: decodedPayload.sub,
  nome: decodedPayload.nome,
  admin: decodedPayload.admin,
};

function clearStorageAndRedirect() {
  let credentials = sessionStorage.getItem("token");
  sessionStorage.clear();

  let rememberCredentials = false;
  if (credentials && credentials != "") {
    credentials = JSON.parse(credentials);
    rememberCredentials = credentials.remember;
    if (rememberCredentials) {
      sessionStorage.setItem("token", JSON.stringify(credentials));
    }
  }
  window.location.href = "/";
}

let itemsHeader = [];

// Verificar se o usuário está logado e é um admin
if (decodedPayload && decodedPayload.admin) {
  itemsHeader = [
    {
      name: "Home",
      url: "/pages/home.html",
      icon: "home",
    },
    {
      name: "Relatório de Ponto",
      url: "/pages/registroponto.html",
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
      name: "Relatório Ponto Funcionários",
      url: "/pages/pontofuncionarios.html",
      icon: "list",
    },
    {
      name: "Solicitações Ajustes",
      url: "/pages/solicitacoesajuste.html",
      icon: "ajuste-calendario",
    },
  ];
} else {
  itemsHeader = [
    {
      name: "Home",
      url: "/pages/home.html",
      icon: "home",
    },
    {
      name: "Relatório de Ponto",
      url: "/pages/registroponto.html",
      icon: "list",
    },
  ];
}

function handleSideMenu() {
  var sideMenu = document.querySelector(".side-menu-container");
  sideMenu.classList.toggle("collapsed");
}

let header = () => {
  let html = `
            <div class=\"header-horizontal\">
                <img class = \"menu-toggler\" src=\"/assets/img/menu.svg\" onClick="handleSideMenu()">
                <img class =  \"header-logo" src=\"/assets/img/alerta.svg\"> 
            </div>
            <nav class= \"side-menu-container\">
              <ul class = \"side-menu\">
               `;
  itemsHeader.forEach(
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
            </nav>  
          `;

  return html;
};

document.querySelector(".header").innerHTML = header();
