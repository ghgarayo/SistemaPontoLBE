if (!token) {
  window.location.href = "/index.html";
}

const columnItems = [
  { title: "Data", key: "dataCompleta" },
  { title: "Entrada", key: "horarioEntrada1" },
  // { title: "Latitude", key: "latitudeEntrada1" },
  // { title: "Longitude", key: "longitudeEntrada1" },
  { title: "Saída", key: "horarioSaida1" },
  // { title: "Latitude", key: "latitudeSaida1" },
  // { title: "Longitude", key: "longitudeSaida1" },
  { title: "Entrada", key: "horarioEntrada2" },
  // { title: "Latitude", key: "latitudeEntrada2" },
  // { title: "Longitude", key: "longitudeEntrada2" },
  { title: "Saída", key: "horarioSaida2" },
  // { title: "Latitude", key: "latitudeSaida2" },
  // { title: "Longitude", key: "longitudeSaida2" },
];

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

// Realizar a chamada GET usando fetch
fetch(`${URL}/api/registro-ponto/${usuario.email}/${anoAtual}/${mesAtual}`, {
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
    document.querySelector(".content").innerHTML = createHTML(data);
  })
  .catch((error) => {
    console.log(error);
    // Tratar o erro de forma adequada
  });

// Função para criar o HTML com base nos dados obtidos
function createHTML(data) {
  let monthToBeShown = mesAtual;
  let yearToBeShown = anoAtual;

  let html = `<div class="seletor-data">
                    <div class="month-container">`;

  if (monthToBeShown > 1) {
    var mesAnterior = monthToBeShown - 1;
    html += `<button class="mes-anterior" onclick="fazerSolicitacao(${mesAnterior}, ${anoAtual})">&lt;&lt;</button>
              <span> ${getMonthName(monthToBeShown)} </span> `;
    monthToBeShown = mesAnterior;
  }
  if (monthToBeShown < 12) {
    var mesSeguinte = monthToBeShown + 1;
    html += `<button class="mes-seguinte" onclick="fazerSolicitacao(${mesSeguinte}, ${anoAtual})">&gt;&gt;</button>`;
    monthToBeShown = mesSeguinte;
  }

  html += `
                    </div>
                    <div class="year-container">`;

  var anoAnterior = yearToBeShown - 1;
  html += `<button onclick="fazerSolicitacao(${monthToBeShown}, ${anoAnterior})">&lt;&lt;</button>
                <span> ${anoAtual} </span> `;
  yearToBeShown = anoAnterior;

  var anoSeguinte = yearToBeShown + 1;
  html += `<button onclick="fazerSolicitacao(${monthToBeShown}, ${anoSeguinte})">&gt;&gt;</button>
                  </div>
           </div>`;
  yearToBeShown = anoSeguinte;

  html += `
<table class="tabela-registro-ponto">
  <thead class="titulo-tabela">
    <tr>
      <th colspan="${columnItems.length + 1}"><h1>Registro de Ponto</h1></th>
    </tr>
  </thead>
  <thead>
    <tr class="header-tabela">
`;

  // Criar os cabeçalhos das colunas com base nos itens de coluna definidos
  columnItems.forEach((column) => {
    html += `<th class="item-header-tabela">${column.title}</th>`;
  });

  html += `
      <th class="ponto-actions item-header-tabela">Ações</th>
    </tr>
  </thead>
  <tbody class="dados-tabela">
`;

  // Preencher os dados com base nos objetos do conteúdo
  data.forEach((item) => {
    html += `<tr class="linha-tabela">`;
    columnItems.forEach((column) => {
      const value = item[column.key];
      const formattedValue =
        column.key === "dataCompleta" ? converterFormatoData(value) : value;
      html += `<td class="value">${
        formattedValue !== null ? formattedValue : ""
      }</td>`;
    });
    html += `<td class="ponto-actions-button"><button class="botao-ajuste">Ajuste</button></td>`;
    html += `</tr>`;
  });

  html += `
  </tbody>
</table>`;

  return html;
}

// Função para converter a data no formato desejado
function converterFormatoData(data) {
  // Dividir a data em partes usando o separador '-'
  const dataSeparada = data.split("-");

  const ano = dataSeparada[0];
  const mes = dataSeparada[1];
  const dia = dataSeparada[2];

  // Concatenar as partes da data no formato desejado
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}

// Função para fazer a solicitação GET com base no mês e ano
function fazerSolicitacao(mes, ano) {
  fetch(`${URL}/api/registro-ponto/${usuario.email}/${ano}/${mes}`, {
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
      document.querySelector(".content").innerHTML = createHTML(data);
    })
    .catch((error) => {
      console.log(error);
      // Tratar o erro de forma adequada
    });
}

// Função para obter o nome do mês com base no número
function getMonthName(mesAtual) {
  for (let i = 0; i < numberToMonth.length; i++) {
    if (numberToMonth[i].id === mesAtual) {
      return numberToMonth[i].month;
    }
  }
  return null; // Retornar null caso o mês não seja encontrado
}

let linkMesAnterior = document.querySelector(".mes-anterior");
let linkMesSeguinte = document.querySelector(".mes-seguinte");
let linkAnoAnterior = document.querySelector(".ano-anterior");
let linkAnoSeguinte = document.querySelector(".ano-seguinte");

linkMesAnterior.addEventListener("click", function () {
  fazerSolicitacao(mesAnterior, ano);
});

linkMesSeguinte.addEventListener("click", function () {
  fazerSolicitacao(mesSeguinte, ano);
});

linkAnoAnterior.addEventListener("click", function () {
  fazerSolicitacao(mes, anoAnterior);
});

linkAnoSeguinte.addEventListener("click", function () {
  fazerSolicitacao(mes, anoSeguinte);
});
