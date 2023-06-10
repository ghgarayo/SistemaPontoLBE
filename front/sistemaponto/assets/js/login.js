
document.getElementById("loginForm").addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  
  const login = document.getElementById("loginInput").value;
  const senha = document.getElementById("senhaInput").value;

  const data = {
    login: login,
    senha: senha
  };
  
  fetch(`http://localhost:8080/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      sessionStorage.setItem("token", data.token);
      console.log(data.token);
      // Redirect to the home page
      window.location.href = "./../../pages/home.html";
    }
  })
  .catch(error => {
    alert("Login ou senha incorretos!");
    console.error(error);
  });

}
