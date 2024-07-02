// js/modules/payloads.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/payloads")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const payloadsHtml = data.map(payload => `
                <div class="payload">
                    <h2>${payload.name}</h2>
                    <p>Type: ${payload.type}</p>
                    <p>Customers: ${payload.customers.join(', ')}</p>
                    <p>Nationality: ${payload.nationality}</p>
                    <p>Manufacturer: ${payload.manufacturer}</p>
                    <p>Orbit: ${payload.orbit}</p>
                    <p>Reference System: ${payload.orbit_params.reference_system}</p>
                    <p>Regime: ${payload.orbit_params.regime}</p>
                    <p>Mass (kg): ${payload.mass_kg}</p>
                    <p>Mass (lb): ${payload.mass_lbs}</p>
                    <p>Details: ${payload.description}</p>
                </div>
            `).join('');

            container.innerHTML = payloadsHtml;
        })
        .catch(error => {
            console.error("Error fetching payloads data:", error);
        });
}
