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
    document.querySelector(".content-por-funcionario").innerHTML = createHTML(data);
  })
  .catch((error) => {
    console.log(error);
    // Tratar o erro de forma adequada
  });

// Função para criar o HTML com base nos dados obtidos
function createHTML(data) {
  let html = `
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
        formattedValue !== null ? formattedValue : "-- : -- : --"
      }</td>`;
    });
    html += `<td class="ponto-actions-container">
                  <button class="botao-ajuste">Ajuste</button>
                  <button class="botao-ajuste">Expandir</button>
                  </td>`;
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

  // Concatenar as partes da data no formato DD/MM/AAAA
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

let mesInicial = mesAtual;
let anoInicial = anoAtual;

document.querySelector(".exibir-mes").textContent = getMonthName(mesInicial);
document.querySelector(".exibir-ano").textContent = anoInicial;

linkMesAnterior.addEventListener("click", () => {
  if (mesAtual === 1) {
    mesAtual = 12;
    anoAtual -= 1;
    document.querySelector(".exibir-mes").textContent = getMonthName(mesAtual);
    document.querySelector(".exibir-ano").textContent = anoAtual;

  } else {
    mesAtual -= 1;
    document.querySelector(".exibir-mes").textContent = getMonthName(mesAtual);
  }
  // console.log("Mes Atual", mesAtual);
  // console.log("Ano Atual", anoAtual);
  // console.log("Mes Inicial", mesInicial);
  // console.log("Ano Inicial", anoInicial);
  fazerSolicitacao(mesAtual, anoAtual);
});

linkMesSeguinte.addEventListener("click", () => {
  if (mesAtual === mesInicial && anoAtual === anoInicial) {
    return;
  } else if (mesAtual === 12) {
    mesAtual = 1;
    anoAtual += 1;
    document.querySelector(".exibir-mes").textContent = getMonthName(mesAtual);
    document.querySelector(".exibir-ano").textContent = anoAtual;

  } else {
    mesAtual += 1;
    document.querySelector(".exibir-mes").textContent = getMonthName(mesAtual);
  }
  // console.log("Mes Atual", mesAtual);
  // console.log("Ano Atual", anoAtual);
  // console.log("Mes Inicial", mesInicial);
  // console.log("Ano Inicial", anoInicial);
  fazerSolicitacao(mesAtual, anoAtual);
});

linkAnoAnterior.addEventListener("click", () => {
  anoAtual -= 1;
  // console.log("Mes Atual", mesAtual);
  // console.log("Ano Atual", anoAtual);
  // console.log("Mes Inicial", mesInicial);
  // console.log("Ano Inicial", anoInicial);
  document.querySelector(".exibir-ano").textContent = anoAtual;
  fazerSolicitacao(mesAtual, anoAtual);
});

linkAnoSeguinte.addEventListener("click", () => {
  if (anoAtual === anoInicial) {
    return;
  }
  anoAtual += 1;
  // console.log("Mes Atual", mesAtual);
  // console.log("Ano Atual", anoAtual);
  // console.log("Mes Inicial", mesInicial);
  // console.log("Ano Inicial", anoInicial);
  document.querySelector(".exibir-ano").textContent = anoAtual;
  fazerSolicitacao(mesAtual, anoAtual);
});
