let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/rockets")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderRockets(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching rocket data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un cohete por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}


function renderRockets(data, container) {
    const rocketsHtml = data.map(rocket => `
        <div class="rocket">
        <h2 class="rocket-name">${rocket.name}</h2>
        <div class="izquierda">
    <h2> ${rocket.country}</h2>
    <p class="rocket-description"> ${rocket.description}</p>

    <h2>The estimated cost per rocket launch</h2>
    <p class="rocket-cost-per-launch"> $${rocket.cost_per_launch.toLocaleString()}</p>

    <h2>The date of the first flight of the rocket</h2>
    <p class="rocket-description"> ${rocket.first_flight}</p>

    <h2>Read more about the coete</h2>
    <p class="rocket-description">${rocket.wikipedia}</p>
    </div>
     <div class="derecha">
    <h2>Rocket Weight</h2>
    <div class="progress-container">
        <progress max="100" value="${rocket.mass.kg / 1000}"></progress>
        <span>${rocket.mass.kg}Kg</span>
        <span>${rocket.mass.lb}lb</span>
    </div>

    <h2>Low Earth Orbit</h2>
    <div class="progress-container">
        <progress max="100" value="${rocket.payload_weights[0].kg / 1000}"></progress>
        <span>${rocket.payload_weights[0].kg}kg</span>
        <span>${rocket.payload_weights[0].lb}lb</span>
    </div>

    <h2>Rocket Height</h2>
    <div class="progress-container">
        <progress max="100" value="${rocket.height.meters}"></progress>
        <span>${rocket.height.meters}m</span>
        <span>${rocket.height.feet}ft</span>
    </div>

    <h2>Rocket Diameter</h2>
    <div class="progress-container">
        <progress max="100" value="${rocket.diameter.meters * 10}"></progress>
        <span>${rocket.diameter.meters}m</span>
        <span>${rocket.diameter.feet}ft</span>
    </div>

    <h2>Diameter Rocket Shield</h2>
    <div class="progress-container">
        <progress max="100" value="${rocket.second_stage.payloads.composite_fairing.diameter.meters * 10}"></progress>
        <span>${rocket.second_stage.payloads.composite_fairing.diameter.meters}m</span>
        <span>${rocket.second_stage.payloads.composite_fairing.diameter.feet}ft</span>
    </div>

    <h2>Height Rocket Shield</h2>
    <div class="progress-container">
        <progress max="100" value="${rocket.second_stage.payloads.composite_fairing.height.meters}"></progress>
        <span>${rocket.second_stage.payloads.composite_fairing.height.meters}m</span>
        <span>${rocket.second_stage.payloads.composite_fairing.height.feet}ft</span>
    </div>
</div>
            <div class="rocket-group">
                <p class="rocket-description">Description: ${rocket.description}</p>
                <p class="rocket-height">Height: ${rocket.height.meters} meters / ${rocket.height.feet} feet</p>
                <p class="rocket-diameter">Diameter: ${rocket.diameter.meters} meters / ${rocket.diameter.feet} feet</p>
                <p class="rocket-mass">Mass: ${rocket.mass.kg} kg / ${rocket.mass.lb} lb</p>
                <p class="rocket-payload-weights">Payload Weights: ${rocket.payload_weights.map(pw => `${pw.name}: ${pw.kg} kg / ${pw.lb} lb`).join(', ')}</p>
                <p class="rocket-first-flight">First Flight: ${rocket.first_flight}</p>
                <p class="rocket-cost-per-launch">Cost per Launch: $${rocket.cost_per_launch.toLocaleString()}</p>
                <p class="rocket-success-rate">Success Rate: ${rocket.success_rate_pct}%</p>
                <p class="rocket-stages">Stages: ${rocket.stages}</p>
                <p class="rocket-boosters">Boosters: ${rocket.boosters}</p>
            </div>
            <div class="rocket-details">
                <h3>Engines</h3>
                <p class="rocket-engines">Number: ${rocket.engines.number}</p>
                <p class="rocket-engine-type">Type: ${rocket.engines.type}</p>
                
                <p class="rocket-engine-thrust-sea-level">Thrust (Sea Level): ${rocket.engines.thrust_sea_level.kN} kN / ${rocket.engines.thrust_sea_level.lbf} lbf</p>
                <p class="rocket-engine-thrust-vacuum">Thrust (Vacuum): ${rocket.engines.thrust_vacuum.kN} kN / ${rocket.engines.thrust_vacuum.lbf} lbf</p>
                <h3>Landing Legs</h3>
                <p class="rocket-landing-legs">Number: ${rocket.landing_legs.number}</p>
                <p class="rocket-landing-material">Material: ${rocket.landing_legs.material || 'N/A'}</p>
                <h3>Second Stage</h3>
                <p class="rocket-second-stage-thrust">Thrust: ${rocket.second_stage.thrust.kN} kN / ${rocket.second_stage.thrust.lbf} lbf</p>
                <p class="rocket-second-stage-payloads-composite-fairing-diameter">Composite Fairing Diameter: ${rocket.second_stage.payloads.composite_fairing.diameter.meters} meters / ${rocket.second_stage.payloads.composite_fairing.diameter.feet} feet</p>
                <p class="rocket-second-stage-payloads-composite-fairing-height">Composite Fairing Height: ${rocket.second_stage.payloads.composite_fairing.height.meters} meters / ${rocket.second_stage.payloads.composite_fairing.height.feet} feet</p>
                <h3>First Stage</h3>
                <p class="rocket-first-stage-thrust-sea-level">Thrust (Sea Level): ${rocket.first_stage.thrust_sea_level.kN} kN / ${rocket.first_stage.thrust_sea_level.lbf} lbf</p>
                <p class="rocket-first-stage-thrust-vacuum">Thrust (Vacuum): ${rocket.first_stage.thrust_vacuum.kN} kN / ${rocket.first_stage.thrust_vacuum.lbf} lbf</p>
                <p class="rocket-first-stage-burn-time">Burn Time: ${rocket.first_stage.burn_time_sec} sec</p>
                <p class="rocket-first-stage-reusable">Reusable: ${rocket.first_stage.reusable}</p>
            </div>
            <img class="rocket-image" src="${rocket.flickr_images.length > 0 ? rocket.flickr_images[0] : 'placeholder.jpg'}" alt="${rocket.name} image" style="width: 300px;" referrerpolicy="no-referrer">
        <div class="rocket-table">
    <table>
        <tr>
            <th>INFORMATION</th>
            <th>ROCKET</th>
        </tr>
        <tr>
            <td>Type</td>
            <td id="rocket-type"></td>
        </tr>
        <tr>
            <td>Rocket in service</td>
            <td id="rocket-service"></td>
        </tr>
        <tr>
            <td>Number of stages</td>
            <td id="rocket-stages"></td>
        </tr>
        <tr>
            <td>Number of propellants</td>
            <td id="rocket-propellants"></td>
        </tr>
        <tr>
            <td>Landing legs</td>
            <td id="rocket-landing-legs"></td>
        </tr>
        <tr>
            <td>Leg material</td>
            <td id="rocket-leg-material"></td>
        </tr>
    </table>
</div>
  <div class="rocket-table1">
    <table>
        <tr>
            <th>INFORMATION</th>
            <th>ROCKET</th>
        </tr>
        <tr>
            <td>Type</td>
            <td id="rocket-engine-type"></td>
        </tr>
        <tr>
            <td>Stages</td>
            <td id="rocket-service"></td>
        </tr>
        <tr>
            <td>Busters</td>
            <td id="rocket-stages"></td>
        </tr>
        <tr>
            <td>Cost per launch</td>
            <td id="rocket-propellants"></td>
        </tr>
        <tr>
            <td>Stage 1 fuel</td>
            <td id="rocket-landing-legs"></td>
        </tr>
        <tr>
            <td>stage 2 fuel</td>
            <td id="rocket-leg-material"></td>
        </tr>
    </table>
</div>
            </div>
    `).join('');

    container.innerHTML = rocketsHtml;
    // Actualiza la tabla con los datos específicos del cohete actual
    const rocketTable = container.querySelector('.rocket-table');
    if (rocketTable) {
        const rocket = data[0]; // Considerando que data contiene un solo cohete por página
        rocketTable.querySelector('#rocket-type').textContent = rocket.type;
        rocketTable.querySelector('#rocket-service').textContent = rocket.active ? 'Active' : 'Inactive';
        rocketTable.querySelector('#rocket-stages').textContent = rocket.stages;
        rocketTable.querySelector('#rocket-propellants').textContent = rocket.engines.propellant_1 + ', ' + rocket.engines.propellant_2;
        rocketTable.querySelector('#rocket-landing-legs').textContent = rocket.landing_legs.number;
        rocketTable.querySelector('#rocket-leg-material').textContent = rocket.landing_legs.material || 'N/A';
    }

    // Actualiza la tabla con los datos específicos del cohete actual
    const rocketTable1 = container.querySelector('.rocket-table1');
    if (rocketTable1) {
        const rocket = data[0]; // Considerando que data contiene un solo cohete por página
        rocketTable1.querySelector('#rocket-engine-type').textContent = rocket.engines.type;
        rocketTable1.querySelector('#rocket-service').textContent = rocket.stages;
        rocketTable1.querySelector('#rocket-stages').textContent = rocket.boosters;
        rocketTable1.querySelector('#rocket-propellants').textContent = rocket.cost_per_launch.toLocaleString();
        rocketTable1.querySelector('#rocket-landing-legs').textContent = rocket.engines.propellant_1;
        rocketTable1.querySelector('#rocket-leg-material').textContent = rocket.engines.propellant_2;
    }
}
function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un cohete por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `<div id="paginationAll" style="overflow-x: auto;">`;
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<button class="page-number" data-page="${i}">${i}</button>`;
    }
    paginationHtml += `</div>`;

    container.insertAdjacentHTML('beforeend', paginationHtml);

    document.querySelectorAll('.page-number').forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.getAttribute('data-page'));
            loadModuleData(container, page);
        });
    });
}
