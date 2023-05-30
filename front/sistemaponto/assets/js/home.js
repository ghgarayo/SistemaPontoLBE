let token = sessionStorage.getItem("token");
let decodedPayload = "";

if (!token) {
  window.location.href = "/index.html";
} else {
  decodedPayload = JSON.parse(atob(token.split(".")[1]));
}

console.log(token)
console.log(decodedPayload)

let usuario = {
  email: decodedPayload.sub,
  nome: decodedPayload.nome,
  admin: decodedPayload.admin,
};

let boasVindas = () => {
  let html = `
                <section class = \"container\">
                      <article class = \"detalhes-usuario-container"\>
                              <p class=\"info-usuario\"> Usuário: <span class=\"nome-usuario\"> ${usuario.nome} </span></p>
                              <p class=\"info-usuario\"> E-mail: <span class=\"email-usuario\"> ${usuario.email} </span></p>   
                      </article>
                      
                      <div class =\"registro-ponto-container\">
                                <img class= \"alert\" src=\"/assets/img/alerta.svg\">
                                <h3 class =\"registro-ponto-title\"> Confira seu horário antes de efetuar o registro do ponto </h3>
                                <button class=\"botao-ponto\" onclick="registrarBatida()">Registrar Batida de Ponto</button>
                                <p class= \"data-hora\" id=\"data-hora\"></p>
                      </div>
                </section>                
              `;

  return html;
};

document.querySelector(".main-container").innerHTML = boasVindas();

function registrarBatida() {
  let dataHora = new Date();
  let dataCompleta = dataHora.toISOString().split("T")[0];
  let horarioCompleto = dataHora.toTimeString().split(" ")[0];

  // Obter geolocalização do cliente
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let registroPonto = {
          dataCompleta: dataCompleta,
          horarioCompleto: horarioCompleto,
          latitude: latitude,
          login: usuario.email,
          longitude: longitude,
        };

        let headers = {
          Authorization: `Bearer ${token}`,
        };

        console.log(registroPonto);

        axios.post("http://localhost:8080/api/registro-ponto", registroPonto, {
            headers,
          })
          .then(function (response) {
            // Exibir resposta do servidor
            console.log(response.data);
            alert("Batida de ponto registrada com sucesso!");
          })
          .catch(function (error) {
            // Tratar erros
            console.log(error);
            alert("Ocorreu um erro ao registrar a batida de ponto.");
          });
      },
      function (error) {
        alert("Ocorreu um erro ao obter a geolocalização: " + error.message);
      }
    );
  } else {
    alert("Geolocalização não suportada pelo seu navegador.");
  }
}

function exibirDataHora() {
  let dataHoraElement = document.getElementById("data-hora");
  let dataHora = new Date();

  // Formatar data e hora
  let data = dataHora.toLocaleDateString();
  let hora = dataHora.toLocaleTimeString();

  // Exibir resultado
  dataHoraElement.textContent = "Data: " + data + " Hora: " + hora;
}

// Atualizar data e hora a cada segundo
setInterval(exibirDataHora, 1000);
