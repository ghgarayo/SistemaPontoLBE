// let token = sessionStorage.getItem("token");
// let decodedPayload = "";

// if (!token) {
//   window.location.href = "/index.html";
// } else {
//   decodedPayload = JSON.parse(atob(token.split(".")[1]));
// }

// let usuario = {
//   email: decodedPayload.sub,
//   nome: decodedPayload.nome,
//   admin: decodedPayload.admin,
// };

// let headers = {
//   Authorization: `Bearer ${token}`,
// };

// axios
//   .get(`http://localhost:8080/api/registro-ponto/${usuario.email}`, { headers })
//   .then((response) => {
//     if (response.data.length > 0) {
//       data = response.data;
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const URL = "http://localhost:8080";

let data = [
  {
    content: [
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      },
      {
        dataCompleta: "2023-04-30",
        horarioEntrada1: "16:19:17",
        latitudeEntrada1: "-25.4997715",
        longitudeEntrada1: "-49.2511995",
        horarioSaida1: "16:19:22",
        latitudeSaida1: "-25.4997715",
        longitudeSaida1: "-49.2511995",
        horarioEntrada2: "16:19:25",
        latitudeEntrada2: "-25.4997715",
        longitudeEntrada2: "-49.2511995",
        horarioSaida2: "16:19:28",
        latitudeSaida2: "-25.4997715",
        longitudeSaida2: "-49.2511995",
      }
    ],
  },
];

let columnItems = [
  { title: "Data", key: "dataCompleta" },
  { title: "Entrada 1", key: "horarioEntrada1" },
  { title: "Latitude", key: "latitudeEntrada1" },
  { title: "Longitude", key: "longitudeEntrada1" },
  { title: "Saída 1", key: "horarioSaida1" },
  { title: "Latitude", key: "latitudeSaida1" },
  { title: "Longitude", key: "longitudeSaida1" },
  { title: "Entrada 2", key: "horarioEntrada2" },
  { title: "Latitude", key: "latitudeEntrada2" },
  { title: "Longitude", key: "longitudeEntrada2" },
  { title: "Saída 2", key: "horarioSaida2" },
  { title: "Latitude", key: "latitudeSaida2" },
  { title: "Longitude", key: "longitudeSaida2" },
];

let createTable = (data) => {
  let html = `
    <table class=\"tabela\">
      <thead class=\"cabecalho-tabela\">
        <tr>
  `;

  // Criar o cabeçalho da tabela com base nos itens de coluna definidos
  columnItems.forEach((column) => {
    html += `<th classe=\"coluna-tabela\">${column.title}</th>`;
  });

  html += `
        </tr>
      </thead>
      <tbody>
  `;

  // Preencher os dados da tabela com base nos objetos do conteúdo
  data[0].content.forEach((item) => {
    html += `<tr classe=\"linha-tabela\">`;
    columnItems.forEach((column) => {
      html += `<td >${item[column.key]}</td>`;
    });
    html += "</tr>";
  });

  html += `
      </tbody>
    </table>
  `;

  return html;
};

document.querySelector(".main-container").innerHTML = createTable(data);

