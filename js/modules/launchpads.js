// js/modules/launchpads.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/launchpads")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const launchpadsHtml = data.map(launchpad => `
                <div class="launchpad">
                    <h2>${launchpad.name}</h2>
                    <p>Full Name: ${launchpad.full_name}</p>
                    <p>Location: ${launchpad.locality}, ${launchpad.region}</p>
                    <p>Details: ${launchpad.details}</p>
                    <p>Successful Landings: ${launchpad.successful_landings}</p>
                    <p>Attempted Launches: ${launchpad.attempted_launches}</p>
                    <p>Successful Launches: ${launchpad.successful_launches}</p>
                    <p>Wikipedia: <a href="${launchpad.wikipedia}" target="_blank">${launchpad.wikipedia}</a></p>
                </div>
            `).join('');

            container.innerHTML = launchpadsHtml;
        })
        .catch(error => {
            console.error("Error fetching launchpads data:", error);
        });
}
