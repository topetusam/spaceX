// js/modules/capsules.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/capsules")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const capsulesHtml = data.map(capsule => `
                <div class="capsule">
                    <h2>${capsule.name}</h2>
                    <p>Type: ${capsule.type}</p>
                    <p>Status: ${capsule.status}</p>
                    <p>Details: ${capsule.details}</p>
                    <p>Reuse Count: ${capsule.reuse_count}</p>
                    <p>Water Landings: ${capsule.water_landings}</p>
                    <p>Land Landings: ${capsule.land_landings}</p>
                    <p>Serial Number: ${capsule.serial}</p>
                    <img src="https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg" alt="${capsule.name} image" style="width: 300px;" referrerpolicy="no-referrer">
                </div>
            `).join('');

            container.innerHTML = capsulesHtml;
        })
        .catch(error => {
            console.error("Error fetching capsule data:", error);
        });
}
