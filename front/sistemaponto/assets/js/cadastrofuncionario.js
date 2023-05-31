if (!token || !usuario.admin) {
  window.location.href = "/index.html";
}

document
  .getElementById("formularioCadastro")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtém os valores dos campos de entrada
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    var cpf = document.getElementById("cpf").value;
    var rg = document.getElementById("rg").value;
    var senha = document.getElementById("senha").value;
    var logradouro = document.getElementById("logradouro").value;
    var bairro = document.getElementById("bairro").value;
    var cep = document.getElementById("cep").value;
    var cidade = document.getElementById("cidade").value;
    var uf = document.getElementById("uf").value;
    var numero = document.getElementById("numero").value;
    var complemento = document.getElementById("complemento").value;
    var isAdmin = document.getElementById("isAdmin").checked;

    // Cria um objeto com os dados do funcionário
    var funcionario = {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      rg: rg,
      senha: senha,
      endereco: {
        logradouro: logradouro,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        uf: uf,
        numero: numero,
        complemento: complemento,
      },
      isAdmin: isAdmin,
    };

    // Envia os dados para o backend usando fetch e o método POST
    fetch(`${URL}/api/funcionarios`, {
      method: "POST",
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
          alert("Cadastro de funcionário enviado com sucesso!");
        } else {
          // Erro no envio dos dados
          alert(
            "Erro ao enviar o cadastro de funcionário. Por favor, tente novamente."
          );
        }
      })
      .catch(function (error) {
        // Erro de conexão ou no processamento da resposta
        alert("Ocorreu um erro. Por favor, tente novamente mais tarde.");
      });
  });
