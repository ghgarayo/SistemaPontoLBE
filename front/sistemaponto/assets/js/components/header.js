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

let itemsHeader = [
  {
    name: "Home",
    url: "/pages/home.html",
    icon: "home",
  },
  {
    name: "Registro de Ponto",
    url: "/pages/registroponto.html",
    icon: "list",
  },
  {
    name: "Funcionários",
    url: "/pages/funcionarios.html",
    icon: "funcionarios",
  },
  {
    name: "Cadastrar Funcionários",
    url: "/pages/cadastrofuncionario.html",
    icon: "cadastro-funcionario",
  },
  {
    name: "Sair",
    url: "/",
    icon: "sair",
  },
];

let header = () => {
  let html = `
            <nav class= \"header-container\">
              <ul class = \"header-menu\">
               `;
  itemsHeader.forEach(
    (item) =>
      (html += `
                  <li class = \"header-menu-item\"> 
                      <a class = \"header-menu-link\" href= \"${item.url}\"> 
                          <img class= \"header-item-icon\" src=\"/assets/img/${item.icon}.svg\">
                          <span class = \"item-name"\> 
                            ${item.name}  
                          </span>
                      </a>
                  </li>
                `)
  );

  html += `
              </ul>           
            </nav>  
          `;

  return html;
};

document.querySelector(".header").innerHTML = header();
