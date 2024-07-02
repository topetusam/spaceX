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
            <div class="rocket-group">
                <h2 class="rocket-name">${rocket.name}</h2>
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
                <p class="rocket-engine-version">Version: ${rocket.engines.version}</p>
                <p class="rocket-propellant-1">Propellant 1: ${rocket.engines.propellant_1}</p>
                <p class="rocket-propellant-2">Propellant 2: ${rocket.engines.propellant_2}</p>
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
        </div>
    `).join('');

    container.innerHTML = rocketsHtml;
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
