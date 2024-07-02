// js/modules/ships.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/ships")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const shipsHtml = data.map(ship => `
                <div class="ship">
                    <h2>${ship.name}</h2>
                    <p>Type: ${ship.type}</p>
                    <p>Roles: ${ship.roles.join(', ')}</p>
                    <p>Active: ${ship.active ? 'Yes' : 'No'}</p>
                    <p>Home Port: ${ship.home_port}</p>
                    <p>Details: ${ship.details}</p>
                    <p>Image: <img src="${ship.image}" alt="${ship.name}" style="max-width: 300px;"></p>
                </div>
            `).join('');

            container.innerHTML = shipsHtml;
        })
        .catch(error => {
            console.error("Error fetching ships data:", error);
        });
}
