if (!token) {
  window.location.href = "/index.html";
}

const columnItems = [
  { title: "Data", key: "dataCompleta" },
  { title: "Entrada 1", key: "horarioEntrada1" },
  { title: "Latitude", key: "latitudeEntrada1" },
  { title: "Longitude", key: "longitudeEntrada1" },
  { title: "Saída 1", key: "horarioSaida1" },
  { title: "Latitude", key: "latitudeSaida1" },
  { title: "Longitude", key: "longitudeSaida1" },
  { title: "Entrada 2", key: "horarioEntrada2" },
  { title: "Latitude", key: "latitudeEntrada2" },
  { title: "Longitude", key: "longitudeEntrada2" },
  { title: "Saída 2", key: "horarioSaida2" },
  { title: "Latitude", key: "latitudeSaida2" },
  { title: "Longitude", key: "longitudeSaida2" },
];

// Realizar a chamada GET usando fetch
fetch(`${URL}/api/registro-ponto/${usuario.email}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Ocorreu um erro ao obter os dados.");
    }
  })
  .then((data) => {
    document.querySelector(".main-container").innerHTML = createHTML(data);
  })
  .catch((error) => {
    console.log(error);
    // Tratar o erro de forma adequada
  });

function createHTML(data) {
  
  console.log(data);

  let html = `
      <div class="container">
        <div class="cabecalho-tabela">
          <h1>Registro de Ponto</h1>
        </div>
        <div class="header-tabela">
          <ul class="coluna-tabela">
    `;

  // Criar os itens de cabeçalho com base nos itens de coluna definidos
  columnItems.forEach((column) => {
    html += `<li class="item-header-tabela">${column.title}</li>`;
  });

  html += `
          </ul>
        </div>
        <div class="dados-tabela">
          <ul class="lista-tabela">
    `;

  // Preencher os dados com base nos objetos do conteúdo
  data.content.forEach((item) => {
    html += `<li class="item-tabela">`;
    columnItems.forEach((column) => {
      html += `<span class="value">${item[column.key]}</span>`;
    });
    html += "</li>";
  });

  html += `
          </ul>
        </div>
      </div>
    `;

  return html;
}
