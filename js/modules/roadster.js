// js/modules/roadster.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/roadster/query")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const roadsterHtml = `
                <div class="roadster-info">
                    <h2>${data.name}</h2>
                    <p>Launch Date: ${new Date(data.launch_date_utc).toDateString()}</p>
                    <p>Earth Distance (km): ${data.earth_distance_km.toLocaleString()}</p>
                    <p>Mars Distance (km): ${data.mars_distance_km.toLocaleString()}</p>
                    <p>Speed (km/h): ${data.speed_kph.toLocaleString()}</p>
                    <p>Details: ${data.details}</p>
                </div>
            `;

            container.innerHTML = roadsterHtml;
        })
        .catch(error => {
            console.error("Error fetching Roadster data:", error);
        });
}
