// js/modules/starlink.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/starlink")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const starlinkHtml = data.map(link => `
                <div class="starlink">
                    <h2>${link.spaceTrack.OBJECT_NAME}</h2>
                    <p>Current Altitude: ${link.spaceTrack.MEAN_ALTITUDE_KM} km</p>
                    <p>Latitude: ${link.latitude}</p>
                    <p>Longitude: ${link.longitude}</p>
                    <p>Spacecraft Type: ${link.spaceTrack.OBJECT_TYPE}</p>
                    <p>NORAD ID: ${link.spaceTrack.OBJECT_ID}</p>
                </div>
            `).join('');

            container.innerHTML = starlinkHtml;
        })
        .catch(error => {
            console.error("Error fetching Starlink data:", error);
        });
}
