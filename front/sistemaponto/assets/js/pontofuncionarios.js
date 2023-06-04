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

fetch(`${URL}/api/funcionarios`, {
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
    document.querySelector(".seletor-funcionarios").innerHTML =
      seletorFuncionarios(data);
  })
  .catch((error) => {
    console.error("Erro ao recuperar lista de funcionários:", error);
  });

let emailSelecionado = "";
console.log("Email", emailSelecionado);

let seletorFuncionarios = (data) => {
  let html = `
  <div class="menu-dropdown">
  <select class="dropdown-funcionarios" onchange="fazerSolicitacao(this.value, ${mesAtual}, ${anoAtual})">
        <option value="">Selecione um funcionário</option>
        `;

  data.content.forEach((item) => {
    html += `<option value="${item.email}">${item.nome}</option>`;
  });

  html += `
        </select>
        </div> 
        `;

  return html;
};

function fazerSolicitacao(email, mes, ano) {
  emailSelecionado = email;
  // console.log(`${URL}/api/registro-ponto/${emailSelecionado}/${ano}/${mes}`);
  fetch(`${URL}/api/registro-ponto/${emailSelecionado}/${ano}/${mes}`, {
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
      document.querySelector(".content-por-funcionario").innerHTML =
        createHTML(data);
    })
    .catch((error) => {
      console.log(error);
      // Tratar o erro de forma adequada
    });
}

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
  fazerSolicitacao(emailSelecionado, mesAtual, anoAtual);
});

linkMesSeguinte.addEventListener("click", () => {
  if (mesAtual === mesInicial) {
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
  fazerSolicitacao(emailSelecionado, mesAtual, anoAtual);
});

linkAnoAnterior.addEventListener("click", () => {
  anoAtual -= 1;
  // console.log("Mes Atual", mesAtual);
  // console.log("Ano Atual", anoAtual);
  // console.log("Mes Inicial", mesInicial);
  // console.log("Ano Inicial", anoInicial);
  document.querySelector(".exibir-ano").textContent = anoAtual;
  fazerSolicitacao(emailSelecionado, mesAtual, anoAtual);
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
  fazerSolicitacao(emailSelecionado, mesAtual, anoAtual);
});

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

// Função para obter o nome do mês com base no número
function getMonthName(mesAtual) {
  for (let i = 0; i < numberToMonth.length; i++) {
    if (numberToMonth[i].id === mesAtual) {
      return numberToMonth[i].month;
    }
  }
  return null; // Retornar null caso o mês não seja encontrado
}
