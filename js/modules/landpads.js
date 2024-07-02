// js/modules/landpads.js

export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/landpads")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const landpadsHtml = data.map(landpad => `
                <div class="landpad">
                    <h2>${landpad.name}</h2>
                    <p>Full Name: ${landpad.full_name}</p>
                    <p>Status: ${landpad.status}</p>
                    <p>Location: ${landpad.location.name}, ${landpad.location.region}</p>
                    <p>Successful Landings: ${landpad.successful_landings}</p>
                    <p>Details: ${landpad.details}</p>
                    <p>Wikipedia: <a href="${landpad.wikipedia}" target="_blank">${landpad.wikipedia}</a></p>
                </div>
            `).join('');

            container.innerHTML = landpadsHtml;
        })
        .catch(error => {
            console.error("Error fetching landpads data:", error);
        });
}
