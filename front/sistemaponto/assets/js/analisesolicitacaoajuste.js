if (!token) {
  window.location.href = "/index.html";
}


const formFields = [
  { title: "Data: ", key: "dataCompleta" },
  { title: "Entrada 1: ", key: "horarioEntrada1" },
  { title: "Saída 1: ", key: "horarioSaida1" },
  { title: "Entrada 2: ", key: "horarioEntrada2" },
  { title: "Saída 2: ", key: "horarioSaida2" },
];

let idPontoParaAjuste = sessionStorage.getItem("idPonto");
let registroSolicitacaoAjuste = sessionStorage.getItem("registroSolicitacaoAjuste");

let descricaoResposta = "";
let buttonSubmit = document.querySelector("#botao-salvar");
let dataHora = new Date();
let dataCompletaAgora = dataHora.toISOString().split("T")[0];
let horaCompletaAgora = dataHora.toTimeString().split(" ")[0];

let ajustePonto = {
  idPonto: idPontoParaAjuste,
  horarioEntrada1: "",
  horarioSaida1: "",
  horarioEntrada2: "",
  horarioSaida2: "",
};


// Realizar a chamada GET usando fetch com o ID para buscar o registo à ser editado;
fetch(`${URL}/api/registro-ponto/${idPontoParaAjuste}`, {
  // console.log(`${URL}/api/registro-ponto/${idPontoParaAjuste}`)
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
    // chamada da função para criar a tabela com as informações do registro de ponto atual
    document.querySelector(".content-1").innerHTML =
      criarTabelaRegistroPontoAtual(data);
  })
  .catch((error) => {
    console.log(error);
  });

// Função para criar a tabela com as informações do registro de ponto atual
function criarTabelaRegistroPontoAtual(data) {
  let populatedFormFields = `      <h1 class='solicitacao-titulo'>Ponto Registrado </h1> 
            <div class= "form-field-container">`;
  for (const item of formFields) {
    if (item.key === "dataCompleta") {
      populatedFormFields += ` 
            <div class="form-field ${item.key}">
                <label for="${item.key}">${item.title}</label> 
                <input 
                type="text" 
                id="${item.key}" 
                name="${item.key}" 
                class="form-input ${item.key}"
                value="${converterFormatoData(data[item.key])}"
                disabled /> 
            </div> 
         `;
    } else {
      populatedFormFields += `
      
        <div class="form-field ${item.key}">
          <label for="${item.key}">${item.title}</label>
          <input 
            type="text" 
            id="${item.key}" 
            name="${item.key}" 
            class="form-input ${item.key}"
            value="${data[item.key]}"
            disabled />
        </div>
        
        `;
    }
  }
  populatedFormFields += `
    </div> 
    `;

  let html = `
    <form id="edit-form" class="edit-form">
      ${populatedFormFields}
    </form>
  `;
  return html;
}

// GET para recuperar as informações de ajustes a serem feitos
// console.log(`${URL}/api/solicitar-ajuste/${registroSolicitacaoAjuste}`)
fetch(`${URL}/api/solicitar-ajuste/${registroSolicitacaoAjuste}`, {
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
    ajustePonto.horarioEntrada1 = data.horarioEntrada1;
    ajustePonto.horarioSaida1 = data.horarioSaida1;
    ajustePonto.horarioEntrada2 = data.horarioEntrada2;
    ajustePonto.horarioSaida2 = data.horarioSaida2;
    // chamada da função para criar a tabela com as informações de ajuste
    document.querySelector(".content-2").innerHTML =
      criarTabelaSolicitacaoAlteracao(data);
  })
  .catch((error) => {
    console.error("Erro ao recuperar lista de solicitações:", error);
  });

console.log(ajustePonto);

// Função para criar a tabela com as informações de ajuste
function criarTabelaSolicitacaoAlteracao(data) {
  // Iniciar a criação do HTML

  // console.log(data);
  let html = "<div class='solicitacoes-container'>";
  html += "<h1 class='solicitacao-titulo'> Sugestão de alteração </h1>";
  html += `<ul class = "solicitacao-ajuste" >`;
  html += `<li class="data"><label>Data:</label><input value="${converterFormatoData(
    data.dataCompleta
  )}" disabled /></li>`;
  html += `<li><label>Entrada 1:</label><input value="${data.horarioEntrada1}" disabled /></li>`;
  html += `<li><label>Saida 1:</label><input value="${data.horarioSaida1}" disabled /></li>`;
  html += `<li><label>Entrada 2:</label><input value="${data.horarioEntrada2}" disabled /></li>`;
  html += `<li><label>Saida 2:</label><input value="${data.horarioSaida2}" disabled /></li>`;
  html += `</ul>`;

  html += `<div class="solicitacao-observacao">
            <h4 class="descricao-titulo">Observação:</h6>
            <p class>${data.descricaoSolicitacao}</p>
           </div>`;

  html += "</div>";

  return html;
}

let resposta = "EM_ANALISE";
console.log(resposta);

// Função para atualizar a variável resposta com a opção selecionada no menu suspenso
function setResposta(selectedResposta) {
  resposta = selectedResposta;
  // console.log(resposta);
  updateJustificativa(resposta);
}

// Função para atualizar o container da justificativa caso a resposta seja "REPROVADO"
function updateJustificativa(resposta) {
  const justificativaContainer = document.querySelector(
    ".justificativa-container"
  );
  if (resposta === "REPROVADO") {
    justificativaContainer.innerHTML = criarRespostaSolicitacao(resposta);
    justificativaContainer.classList.toggle("reprovado");
  } else {
    justificativaContainer.classList.remove("reprovado");
  }
}

// Função para criar o HTML da justificativa caso a resposta seja "REPROVADO"
function criarRespostaSolicitacao(resposta) {
  if (resposta == "REPROVADO") {
    return `
                <label for="justificativa" class="justificativa-titulo descricao-titulo">Justificativa:</label>
                <textarea id="justificativa" name="justificativa" class="justificativa-input solicitacao-observacao" rows="4" cols="25" placeholder="Digite aqui a justificativa para a reprovação da solicitação."></textarea>
          `;
  }
}

// Função para criar a tabela de ações e retornar o HTML gerado
function criarTabelaAcoes() {
  let html = `
  <div class="acoes-container">
    <label for="resposta" class="acoes-titulo solicitacao-titulo">Responder solicitação:</label>
    <select id="resposta" name="resposta" class="seletor-resposta" onchange="setResposta(this.value)">
        <option value="EM_ANALISE">Em Análise</option>
        <option value="REPROVADO">Reprovado</option>
        <option value="APROVADO">Aprovado</option>
    </select>
    <div class="justificativa-container">
      ${criarRespostaSolicitacao(resposta)}
    </div>
    <div class="form-buttons">
        <button 
          type="button" 
          class="botao-salvar" 
          id ="botao-salvar" 
          onclick="finalizarSolicitacaoAjuste(resposta)"
        >Finalizar</button>
        <button 
          type="button" 
          class="botao-voltar" 
          onclick="cancelarEdicao()"
        >Voltar</button>
    </div>
  </div>
  `;

  return html;
}

// Atualiza o conteúdo da classe "content-3" com a tabela de ações gerada
document.querySelector(".content-3").innerHTML = criarTabelaAcoes();

// Função para finalizar a solicitação de ajuste
function finalizarSolicitacaoAjuste(resposta) {
  // Verificar se a resposta foi alterada
  console.log("Finalizar Solicitacao:", resposta);
  switch (resposta) {
    case "REPROVADO":
      descricaoResposta = document.getElementById("justificativa").value;
      if (descricaoResposta === "" || descricaoResposta === null) {
        alert(
          "É necessário inserir uma justificativa para a reprovação da solicitação."
        );
      } else {
        // Cria o objeto que será enviado para o back-end
        const respostaSolicitacao = {
          idAdmin: usuario.id,
          horaCompleta: horaCompletaAgora,
          dataCompleta: dataCompletaAgora,
          resposta: resposta,
          descricaoResposta: descricaoResposta,
        };

        finalizaSolicitacao(respostaSolicitacao);

      }
      break;

    case "APROVADO":
      // Criação dos objetos que serão enviados para o back-end
      // Resposta da solicitacao que será enviado para "SolicitacaoAjusteController"
      const respostaSolicitacao = {
        idAdmin: usuario.id,
        horaCompleta: horaCompletaAgora,
        dataCompleta: dataCompletaAgora,
        resposta: resposta,
        descricaoResposta: descricaoResposta,
      };
      
     // Finalizar a solicitação de ajuste
      finalizaSolicitacao(respostaSolicitacao);
      // Enviar a o ajuste do ponto para o banco de dados
      ajustarPonto(ajustePonto);
      break;
      
      case "EM_ANALISE":
        default:
          cancelarEdicao();
          break;
        }
}

// Função para finalizar a solicitação de ajuste em caso de "REPROVADO" ou "APROVADO"
function finalizaSolicitacao(respostaSolicitacao){
  let headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  fetch(`${URL}/api/solicitar-ajuste/${registroSolicitacaoAjuste}`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(respostaSolicitacao),
  })
    .then(function (response) {
      if (response.ok) {
        alert("Solicitação finalizada com sucesso!");
      } else {
        throw new Error(
          "Ocorreu um erro ao finalizar a solicitação de ajuste."
        );
      }
    })
    .then(function (data) {
      alert("Solicitação finalizada com sucesso!");
    })
    .catch(function (error) {
      console.log(error);
    });
    cancelarEdicao();
}

// Função para realizar o ajuste do Ponto em caso de "APROVADO"
function ajustarPonto(ajustePonto){
  let headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  fetch(`${URL}/api/registro-ponto/${idPontoParaAjuste}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(ajustePonto),
})
.then(function (response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(
      "Ocorreu um erro ao realizar o ajuste do ponto."
    );
  }
})
.then(function (data) {
  console.log(data);
  alert("Ajuste do ponto realizado com sucesso!");
})
.catch(function (error) {
  console.log(error.message);
});
cancelarEdicao();

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

function cancelarEdicao() {
  window.location.href = "/pages/solicitacoesajustes.html";
}
