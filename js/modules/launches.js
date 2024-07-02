// js/modules/launches.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/launches")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const launchesHtml = data.map(launch => `
                <div class="launch">
                    <h2>${launch.name}</h2>
                    <p>Date UTC: ${launch.date_utc}</p>
                    <p>Date Local: ${launch.date_local}</p>
                    <p>Rocket: ${launch.rocket}</p>
                    <p>Success: ${launch.success ? 'Yes' : 'No'}</p>
                    <p>Details: ${launch.details}</p>
                    <p>Links:
                        <ul>
                            <li>Reddit Campaign: <a href="${launch.links.reddit.campaign}" target="_blank">${launch.links.reddit.campaign}</a></li>
                            <li>Reddit Launch: <a href="${launch.links.reddit.launch}" target="_blank">${launch.links.reddit.launch}</a></li>
                            <li>Article: <a href="${launch.links.article}" target="_blank">${launch.links.article}</a></li>
                            <li>Wikipedia: <a href="${launch.links.wikipedia}" target="_blank">${launch.links.wikipedia}</a></li>
                        </ul>
                    </p>
                </div>
            `).join('');

            container.innerHTML = launchesHtml;
        })
        .catch(error => {
            console.error("Error fetching launches data:", error);
        });
}
