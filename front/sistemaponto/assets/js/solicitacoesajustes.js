if (!token) {
  window.location.href = "/index.html";
}

let listaNomesFuncionarios = [];

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
      listaNomesFuncionarios = data.content;
    })
    .catch((error) => {
      console.error("Erro ao recuperar lista de funcionários:", error);
    });


function getNomeFuncionario(idFuncionario){
  let nomeFuncionario = "";
  listaNomesFuncionarios.forEach((item) => {
    if(item.id == idFuncionario){
      nomeFuncionario = item.nome;
    }
  });
  return nomeFuncionario;
}

// GET para recuperar a lista de ajustes de ponto à serem feitos
fetch(`${URL}/api/solicitar-ajuste`, {
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
    document.querySelector(".content").innerHTML = criarHTML(data);
  })
  .catch((error) => {
    console.error("Erro ao recuperar lista de solicitações:", error);
  });
  


function criarHTML(data) {
  // Extrair os dados do objeto
  var content = data.content;
  var pageable = data.pageable;
  var totalElements = data.totalElements;
  var totalPages = data.totalPages;
  var currentPage = data.number + 1;

  // Iniciar a criação do HTML
  let html = "<h1 class='solicitacao-titulo'>Solicitações de ajuste de ponto aguardando avaliação </h1>";
  html += "<div class='solicitacoes-container'>";
  content.forEach((item, i) => {
    nomeFuncionario = getNomeFuncionario(item.idFuncionario);
    html += `<ul class = "solicitacao-ajuste linha-${i}" >`;
    html += `<li class="data"><label>Data:</label><input value="${converterFormatoData(item.dataCompleta)}" disabled/></li>`;
    html += `<li class="funcionario-nome"><label>Nome do Funcionário:</label><input value="${nomeFuncionario}" disabled/></li>`;
    // html += `<li><label>Horario Entrada 1:</label><input value="${item.horarioEntrada1}"/></li>`;
    // html += `<li><label>Horario Saida 1:</label><input value="${item.horarioSaida1}"/></li>`;
    // html += `<li><label>Horario Entrada 2:</label><input value="${item.horarioEntrada2}"/></li>`;
    // html += `<li><label>Horario Saida 2:</label><input value="${item.horarioSaida2}"/></li>`;
    html += `<li>                
              <button class="botao-opçoes botao-editar" onclick="toRedirectToOptions(${item.id},${item.idPonto})">Visualizar</button>
             </li>`;

    html += `</ul>`;
  });
  html += "</div>";

  // // Adicionar informações da paginação
  // html += "<h2>Paginação:</h2>";
  // html += "<p>Página atual: " + currentPage + "</p>";
  // html += "<p>Total de elementos: " + totalElements + "</p>";
  // html += "<p>Total de páginas: " + totalPages + "</p>";
  // html += "<p>Tamanho da página: " + pageable.pageSize + "</p>";

   if(totalPages.length > 1) {
    // Adicionar links para as páginas
    html += "<h3>Páginas:</h3>";
    for (var page = 1; page <= totalPages; page++) {
      if (page === currentPage) {
        html += "<strong>" + page + "</strong>";
      } else {
        html += "<a href='/pagina/" + page + "'>" + page + "</a>";
      }
      html += " ";
    }
  }

  return html;
}

// Função para redirecionar para página de analise de solicitacao de ajuste de ponto
function toRedirectToOptions(registroSolicitacaoAjuste, idPonto) {
  sessionStorage.setItem("registroSolicitacaoAjuste", registroSolicitacaoAjuste);
  sessionStorage.setItem("idPonto", idPonto);
  console.log(idPonto)
  console.log(registroSolicitacaoAjuste)
  window.location.href = "/pages/analise-solicitacao-ajuste.html";
}

// Função para converter a data do formato yyyy-MM-dd para dd/MM/yyy
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

