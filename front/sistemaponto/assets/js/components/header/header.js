const URL = "http://localhost:8080";

let token = sessionStorage.getItem("token");
let decodedPayload = "";

if (!token) {
  window.location.href = "/index.html";
} else {
  decodedPayload = JSON.parse(atob(token.split(".")[1]));
}

let usuario = {
  id: decodedPayload.id,
  email: decodedPayload.sub,
  nome: decodedPayload.nome,
  admin: decodedPayload.admin,
};

// console.log(usuario)

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

let header = () => {
  let html = `
                <img class = \"menu-toggler\" src=\"/assets/img/menu.svg\" onClick="handleSideMenu()">
                <img class =  \"header-logo" src=\"/assets/img/alerta.svg\"> 
             `

  return html;
};

document.querySelector(".header").innerHTML = header();

const numberToMonth = [
  {
    id: 1,
    month: "Janeiro",
  },
  {
    id: 2,
    month: "Fevereiro",
  },
  {
    id: 3,
    month: "Março",
  },
  {
    id: 4,
    month: "Abril",
  },
  {
    id: 5,
    month: "Maio",
  },
  {
    id: 6,
    month: "Junho",
  },
  {
    id: 7,
    month: "Julho",
  },
  {
    id: 8,
    month: "Agosto",
  },
  {
    id: 9,
    month: "Setembro",
  },
  {
    id: 10,
    month: "Outubro",
  },
  {
    id: 11,
    month: "Novembro",
  },
  {
    id: 12,
    month: "Dezembro",
  },
];

let dataAtual = new Date();

let anoAtual = dataAtual.getFullYear();
let mesAtual = dataAtual.getMonth() + 1;

// console.log("Ano", anoAtual)
// console.log("Mes", mesAtual)
