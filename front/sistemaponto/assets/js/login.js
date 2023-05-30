
document.getElementById("loginForm").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  
  const login = document.getElementById("loginInput").value;
  const senha = document.getElementById("senhaInput").value;

  const data = {
    login: login,
    senha: senha
  };
  
  axios.post('http://localhost:8080/api/login', data)
    .then(response => {
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        console.log(response.data.token)
        // Redirect to the home page
        window.location.href = "/pages/home.html";
      }
    })
    .catch(error => {
      console.error(error);
    });
}


