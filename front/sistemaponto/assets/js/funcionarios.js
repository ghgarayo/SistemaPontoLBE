if (!token) {
  window.location.href = "/index.html";
}

const columnItems = [
  { title: "Funcionário", key: "nome", class: "funcionario-nome" },
  { title: "CPF", key: "cpf", class: "funcionario-cpf" },
  { title: "Telefone", key: "telefone", class: "funcionario-telefone" },
  { title: "E-mail", key: "email", class: "funcionario-email" },
];

// Faz uma chamada GET para recuperar a lista de funcionários
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
    document.querySelector(".content").innerHTML = tabelaFuncionarios(data);
    document.querySelector(".lista-funcionarios").innerHTML =
      dropdownFuncionarios(data);
  })
  .catch((error) => {
    console.error("Erro ao recuperar lista de funcionários:", error);
  });

// Cria o HTML da tabela dinâmica com base na lista de funcionários recebida em forma de string
let tabelaFuncionarios = (data) => {
  console.log(data);

  let html = `
      <div class="cabecalho-tabela">
        <h1>Lista de Funcionários</h1>
      </div>
      <div class="header-tabela">
        <ul class="coluna-tabela">
  `;

  // Criar os itens de cabeçalho com base nos itens de coluna definidos
  columnItems.forEach((item) => {
    html += `<li class="item-header-tabela ${item.class}">${item.title}</li>`;
  });
  html += `<li class="item-header-tabela funcionario-actions">Ações</li>`;

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
      html += `<span class="value ${column.class}">${item[column.key]}</span>`;
    });
    html += `<div class=\"actions-container\">`;
    html += `<button class=\"botao-editar\" onclick="setFuncionarioAndRedirect(${item.id})">
                Editar
             </button>`;
    html += `<button class=\"botao-inativar\" onclick=\"inativarUsuario(${item.id})\">
                Inativar 
             </button>`;
    html += `</div>`;
    html += "</li>";
  });

  html += `
        </ul>
      </div>
  `;

  return html;
};

function setFuncionarioAndRedirect(id) {
  sessionStorage.setItem("idFuncionario", id);
  window.location.href = "/pages/editafuncionario.html";
}

function inativarUsuario(idFuncionario) {
  fetch(`${URL}/api/funcionarios/${idFuncionario}`, {
    method: "DELETE",
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
      document.querySelector(".content").innerHTML = criarEditor(data);
    })
    .catch((error) => {
      console.error("Erro ao recuperar lista de funcionários:", error);
    });
}

let dropdownFuncionarios = (data) => {
  console.log(data);
  // Adicionar o menu dropdown com os nomes dos funcionários
  let html = `
    <div class="menu-dropdown">
      <select class="dropdown-funcionarios" onchange="selecionarFuncionario(this.value)">
        <option value="">Selecione um funcionário</option>
  `;

  data.content.forEach((item) => {
    html += `<option>${item.nome}</option>`;
  });

  html += `
      </select>
    </div>
  `;

  return html;
};

document.querySelector(".lista-funcionarios").innerHTML =
  dropdownFuncionarios(data);
