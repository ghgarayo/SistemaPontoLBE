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

let header = () => {
  let html = `
                <img class = \"menu-toggler\" src=\"/assets/img/menu.svg\" onClick="handleSideMenu()">
                <img class =  \"header-logo" src=\"/assets/img/alerta.svg\"> 
             `

  return html;
};

document.querySelector(".header").innerHTML = header();

var dataAtual = new Date();

var anoAtual = dataAtual.getFullYear();
var mesAtual = dataAtual.getMonth() + 1;

console.log("Ano", anoAtual)
console.log("Mes", mesAtual)

