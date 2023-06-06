let idPontoParaAjuste = sessionStorage.getItem("id");
// console.log("ID Ponto para ajuste", idPontoParaAjuste);

const formFields = [
  { title: "Data: ", key: "dataCompleta" },
  { title: "Horário Entrada 1: ", key: "horarioEntrada1" },
  { title: "Latitude Entrada 1: ", key: "latitudeEntrada1" },
  { title: "Longitude Entrada 1: ", key: "longitudeEntrada1" },
  { title: "Horário Saída 1: ", key: "horarioSaida1" },
  { title: "Latitude Saída 1: ", key: "latitudeSaida1" },
  { title: "Longitude Saída 1: ", key: "longitudeSaida1" },
  { title: "Horário Entrada 2: ", key: "horarioEntrada2" },
  { title: "Latitude Entrada 2: ", key: "latitudeEntrada2" },
  { title: "Longitude Entrada 2: ", key: "longitudeEntrada2" },
  { title: "Horário Saída 2: ", key: "horarioSaida2" },
  { title: "Latitude Saída 2: ", key: "latitudeSaida2" },
  { title: "Longitude Saída 2 : ", key: "longitudeSaida2" },
];

// Realizar a chamada GET usando fetch usando o ID acima para buscar o registo à ser editado;
fetch(`${URL}/api/registro-ponto/${idPontoParaAjuste}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Ocorreu um erro ao buscar o registro de ponto.");
    }
  })
  .then((data) => {
    document.querySelector(".content").innerHTML = createHTML(data);
  })
  .catch((error) => {
    console.log(error);
  });

// cria a função que retorna um HTML para criar uma div com as informações do ponto a ser ajustado
function createHTML(data) {
  let populatedFormFields = "";

  for (const item of formFields) {
    populatedFormFields += `
      <div class="form-field ${item.key}">
          <label for="${item.key}">${item.title}</label>
          <input 
            type="text" 
            id="${item.key}" 
            name="${item.key}" 
            class="form-input ${item.key}"
            value="${data[item.key]}" />
      </div>
    `;
  }

  const html = `
    <form id="edit-form" class="edit-form">
      ${populatedFormFields}
      <div class="form-field observacoes">
        <label for="observacoes">Observações :</label>
        <textarea id="observacoes" name="observacoes"></textarea>
      </div>
      <div class="form-field-buttons">
        <button type="submit" onclick="submitRequestForApproval()">Enviar</button>
        <button type="button" onclick="window.location.href='relatorioponto.html'">Cancelar</button>
      </div>
    </form>
  `;

  // Desabilita inputs de latitude e longitude de todas as entradas para que não sejam manipuláveis
  // let latitudeEntrada1 = document.querySelector(".form-input-latitudeEntrada1");

  return html;
}

// Realizar a chamada PUT usando fetch para atualizar o registro de ponto;
function submitRequestForApproval() {
  event.preventDefault();

  //Obtem os valores dos campos de entrada;
  let dataCompleta = document.getElementById("dataCompleta").value;
  let horarioEntrada1 = document.getElementById("horarioEntrada1").value;
  let latitudeEntrada1 = document.getElementById("latitudeEntrada1").value;
  let longitudeEntrada1 = document.getElementById("longitudeEntrada1").value;
  let horarioSaida1 = document.getElementById("horarioSaida1").value;
  let latitudeSaida1 = document.getElementById("latitudeSaida1").value;
  let longitudeSaida1 = document.getElementById("longitudeSaida1").value;
  let horarioEntrada2 = document.getElementById("horarioEntrada2").value;
  let latitudeEntrada2 = document.getElementById("latitudeEntrada2").value;
  let longitudeEntrada2 = document.getElementById("longitudeEntrada2").value;
  let horarioSaida2 = document.getElementById("horarioSaida2").value;
  let latitudeSaida2 = document.getElementById("latitudeSaida2").value;
  let longitudeSaida2 = document.getElementById("longitudeSaida2").value;
  let observacoes = document.getElementById("observacoes").value;

  let ajustePonto = {
    dataCompleta : dataCompleta,
    horarioEntrada1 : horarioEntrada1,
    latitudeEntrada1 : latitudeEntrada1,
    longitudeEntrada1 : longitudeEntrada1,
    horarioSaida1 : horarioSaida1,
    latitudeSaida1 : latitudeSaida1,
    longitudeSaida1 : latitudeSaida1,
    horarioEntrada2 : horarioEntrada2,
    latitudeEntrada2 : latitudeEntrada2,
    longitudeEntrada2 : longitudeEntrada2,
    horarioSaida2 : horarioSaida2,
    latitudeSaida2 : latitudeSaida2,
    longitudeSaida2 : longitudeEntrada2,
    observacoes : observacoes
  }
    

  fetch(`${URL}/api/registro-ponto/${idPontoParaAjuste}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ajustePonto),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Ocorreu um erro ao atualizar o registro de ponto. Tente novamente."
        );
      }
    })
    .then((data) => {
      console.log(data);
      window.location.href = "pontofuncionarios.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

// Realizar a chamada POST usando fetch para enviar a solicitação de ajuste;
