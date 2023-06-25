if (!token) {
  window.location.href = "/index.html";
}

let idFuncionario = sessionStorage.getItem("idFuncionario");
console.log("Id: ", idFuncionario);

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
    document.querySelector(".content").innerHTML = criarEditor(data);
  })
  .catch((error) => {
    console.error("Erro ao recuperar lista de funcionários:", error);
  });

// Cria o HTML para a modal em forma de string
let criarEditor = (data) => {
  let html = `
  <form class="formulario-cadastro" id="formularioCadastro">
        <div class="funcionario-info">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"  value="${data.nome}" />

          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" disabled=\"disabled\" value="${data.cpf}" />

          <label for="rg">RG:</label>
          <input type="text" id="rg" name="rg" disabled=\"disabled\" value="${data.rg}" />
          
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" value="${data.email}" />

          <label for="telefone">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" value="${data.telefone}" />
            
          <div class="admin-container">
            <label for="isAdmin">Tornar administrador(a):</label>
            <input type="checkbox" id="isAdmin" name="isAdmin" />
          </div>

        </div>

        <div class="funcionario-endereco">
          <label for="logradouro">Logradouro:</label>
          <input type="text" id="logradouro" name="logradouro" value="${data.endereco.logradouro}" />

          <label for="bairro">Bairro:</label>
          <input type="text" id="bairro" name="bairro"  value="${data.endereco.bairro}" />

          <label for="cep">CEP:</label>
          <input type="text" id="cep" name="cep" value="${data.endereco.cep}" />

          <label for="cidade">Cidade:</label>
          <input type="text" id="cidade" name="cidade" value="${data.endereco.cidade}" />

          <label for="uf">UF:</label>
          <input type="text" id="uf" name="uf" value="${data.endereco.uf}" />
`
if(!data.endereco.numero){
 html += `
          <label for="numero">Número:</label>
          <input type="text" id="numero" name="numero"/>
          `
} else {
  html += `
          <label for="numero">Número:</label>
          <input type="text" id="numero" name="numero" value="${data.endereco.numero}"/>
          `
}

if(!data.endereco.complemento){
 html += `
          <label for="complemento">Complemento:</label>
          <input type="text" id="complemento" name="complemento"/>
          </div>
          `
} else {
  html += `
          <label for="complemento">Complemento:</label>
          <input type="text" id="complemento" name="complemento" value="${data.endereco.complemento}"/>
          </div>
          `
}
html += `
        <div class="form-buttons">
          <button 
              type="button" 
              class="botao-cadastro" 
               onclick="salvarAlteracoes(usuario)"
              >Salvar Alterações</button>
          <button type="button" class="botao-voltar" onclick="cancelarEdicao()">Voltar</button>
        </div>
      </form>  
  `;

  return html;
};


function salvarAlteracoes() {
  console.log("Usuario: ", idFuncionario)
  // Obtém os valores dos campos de entrada

  var id = idFuncionario;
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
    id: id,
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
  fetch(`${URL}/api/funcionarios`, {
    method: "PUT",
    body: JSON.stringify(funcionario),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      // Processa a resposta do backend
      if (response.ok) {
        // Sucesso no envio dos dados
        alert("Funcionário editado com sucesso!");
      } else {
        // Erro no envio dos dados
        alert("Erro ao editar funcionário. Por favor, tente novamente.");
      }
    })
    .catch(function (error) {
      // Erro de conexão ou no processamento da resposta
      alert("Ocorreu um erro. Por favor, tente novamente mais tarde.");
    });

    window.location.href = "/pages/funcionarios.html";
}

function cancelarEdicao() {
  window.location.href = "/pages/funcionarios.html";
}

