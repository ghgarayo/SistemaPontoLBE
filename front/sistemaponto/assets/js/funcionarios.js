if (!token) {
  window.location.href = "/index.html";
}

const columnItems = [
  { title: "Funcionário", key: "nome" },
  { title: "CPF", key: "cpf" },
  { title: "Telefone", key: "telefone" },
  { title: "E-mail", key: "email" },
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
    document.querySelector(".main-container").innerHTML =
      tabelaFuncionarios(data);
  })
  .catch((error) => {
    console.error("Erro ao recuperar lista de funcionários:", error);
  });

// Cria o HTML da tabela dinâmica com base na lista de funcionários recebida em forma de string
let tabelaFuncionarios = (data) => {
  // console.log(data);

  let html = `
    <div class="container">
      <div class="cabecalho-tabela">
        <h1>Lista de Funcionários</h1>
      </div>
      <div class="header-tabela">
        <ul class="coluna-tabela">
  `;

  // Criar os itens de cabeçalho com base nos itens de coluna definidos
  columnItems.forEach((item) => {
    html += `<li class="item-header-tabela">${item.title}</li>`;
  });
  html += `<li class="item-header-tabela">Ações</li>`;

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
    html += `<button class=\"botao-toggle\">Inativar</button>`;
    html += `<button class=\"botao-editar\" onclick="setFuncionarioAndRedirect(${item.id})">Editar</button>`;
    html += "</li>";
  });

  html += `
        </ul>
      </div>
    </div>
  `;

  return html;
};

function setFuncionarioAndRedirect(id) {
  sessionStorage.setItem("idFuncionario", id);
  window.location.href = "/pages/editafuncionario.html"
}

