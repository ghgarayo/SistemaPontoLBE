if (!token) {
  window.location.href = "/index.html";
}

let idFuncionario = sessionStorage.getItem("idFuncionario");
console.log(idFuncionario);

fetch(`${URL}/api/funcionarios/${idFuncionario}`, {
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
    console.log(data);
    document.querySelector(".main-container").innerHTML = criarEditor(data);
  })
  .catch((error) => {
    console.error("Erro ao recuperar lista de funcionários:", error);
  });

// Cria o HTML para a modal em forma de string
let criarEditor = (data) => {
  let html = `
    <div class="edit-form-container">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">Editar Funcionário</h5>
          </div>
          <div class="modal-body">
            <form id="editForm">
              <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" class="form-control" id="nome" name="nome" value="${data.nome}">
              </div>
              <div class="form-group">
                <label for="cpf">CPF:</label>
                <input type="text" class="form-control" id="cpf" name="cpf" disabled=\"disabled\" value="${data.cpf}">
              </div>
              <div class="form-group">
                <label for="rg">RG:</label>
                <input type="text" class="form-control" id="rg" name="rg" disabled=\"disabled\" value="${data.rg}">
              </div>
              <div class="form-group">
                <label for="telefone">Telefone:</label>
                <input type="text" class="form-control" id="telefone" name="telefone" value="${data.telefone}">
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" name="email" value="${data.email}">
              </div>
              <div class="form-group">
                <label for="logradouro">Logradouro:</label>
                <input type="text" class="form-control" id="logradouro" name="logradouro" value="${data.endereco.logradouro}">
              </div>
              <div class="form-group">
                <label for="bairro">Bairro:</label>
                <input type="text" class="form-control" id="bairro" name="bairro" value="${data.endereco.bairro}">
              </div>
              <div class="form-group">
                <label for="cep">CEP:</label>
                <input type="text" class="form-control" id="cep" name="cep" value="${data.endereco.cep}">
              </div>
              <div class="form-group">
                <label for="cidade">Cidade:</label>
                <input type="text" class="form-control" id="cidade" name="cidade" value="${data.endereco.cidade}">
              </div>
              <div class="form-group">
                <label for="uf">UF:</label>
                <input type="text" class="form-control" id="uf" name="uf" value="${data.endereco.uf}">
              </div>
              <div class="form-group">
                <label for="complemento">Complemento:</label>
                <input type="text" class="form-control" id="complemento" name="complemento" value="${data.endereco.complemento}">
              </div>
              <div class="form-group">
                <label for="numero">Número:</label>
                <input type="text" class="form-control" id="numero" name="numero" value="${data.endereco.numero}">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="salvarAlteracoes()">Salvar Alterações</button>
            <button type="button" class="btn btn-secondary" onclick="cancelarEdicao()">Voltar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  return html;
};

function salvarAlteracoes() {
  // Obtém os valores dos campos de entrada
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var telefone = document.getElementById("telefone").value;
  var logradouro = document.getElementById("logradouro").value;
  var bairro = document.getElementById("bairro").value;
  var cep = document.getElementById("cep").value;
  var cidade = document.getElementById("cidade").value;
  var uf = document.getElementById("uf").value;
  var numero = document.getElementById("numero").value;
  var complemento = document.getElementById("complemento").value;

  // Cria um objeto com os dados do funcionário
  var funcionario = {
    nome: nome,
    email: email,
    telefone: telefone,
    endereco: {
      logradouro: logradouro,
      bairro: bairro,
      cep: cep,
      cidade: cidade,
      uf: uf,
      numero: numero,
      complemento: complemento,
    },
  };

  console.log(funcionario);

  // Envia os dados para o backend usando fetch e o método PUT
  // fetch(`${URL}/api/funcionarios`, {
  //   method: "PUT",
  //   body: JSON.stringify(funcionario),
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then(function (response) {
  //     // Processa a resposta do backend
  //     if (response.ok) {
  //       // Sucesso no envio dos dados
  //       alert("Funcionário editado com sucesso!");
  //     } else {
  //       // Erro no envio dos dados
  //       alert("Erro ao editar funcionário. Por favor, tente novamente.");
  //     }
  //   })
  //   .catch(function (error) {
  //     // Erro de conexão ou no processamento da resposta
  //     alert("Ocorreu um erro. Por favor, tente novamente mais tarde.");
  //   });
}

function cancelarEdicao(){
  window.location.href = "/pages/funcionarios.html"
}