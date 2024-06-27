export function fetchRockets() {
    const apiUrl = "https://api.spacexdata.com/v4/rockets";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifica los datos en la consola
            displayRockets(data);
        })
        .catch(error => console.error("Hubo un problema con la solicitud Fetch:", error));
}

function displayRockets(data) {
    const container = document.getElementById("data-container");

    data.forEach(rocket => {
        const div = document.createElement("div");
        div.classList.add("rocket-item"); // Añadimos una clase para estilizar
        div.innerHTML = `
            <h2>${rocket.name}</h2>
            <p>${rocket.description}</p>
            <p><strong>Primera fecha de vuelo:</strong> ${rocket.first_flight}</p>
            <p><strong>Altura:</strong> ${rocket.height.meters} metros</p>
            <p><strong>Diámetro:</strong> ${rocket.diameter.meters} metros</p>
        `;
        container.appendChild(div);
    });
}
