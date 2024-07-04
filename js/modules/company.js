export function loadModuleData(container) {
    fetch("https://api.spacexdata.com/v4/company")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const companyHtml = `
                <div class="company-info">
                    <h2>${data.name}</h2>
                    <p>Founder: ${data.founder}</p>
                    <p>Founded: ${data.founded}</p>
                    <p>Employees: ${data.employees}</p>
                    <p>CEO: ${data.ceo}</p>
                    <p>Valuation: $${data.valuation.toLocaleString()}</p>
                    <p>Summary: ${data.summary}</p>
                    <p>Headquarters: ${data.headquarters.address}, ${data.headquarters.city}, ${data.headquarters.state}</p>
                    <p>Links: 
                        <a href="${data.links.website}" target="_blank">Website</a>,
                        <a href="${data.links.twitter}" target="_blank">Twitter</a>,
                        <a href="${data.links.elon_twitter}" target="_blank">Elon's Twitter</a>
                    </p>
                    <img src="/storage/img/Elon_Musk_(3018710552).jpg" alt="SpaceX Headquarters" style="max-width: 100%; height: auto; margin-top: 10px;">
                </div>
            `;

            container.innerHTML = companyHtml;
        })
        .catch(error => {
            console.error("Error fetching company data:", error);
        });
}


