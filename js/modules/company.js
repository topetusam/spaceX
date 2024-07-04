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
                 <div class="container">
                    <div class="company-info">
                        <h2>${data.name}</h2>
                        <table class="company-table">
                            <tr><th>Founder</th><td>${data.founder}</td></tr>
                            <tr><th>Founded</th><td>${data.founded}</td></tr>
                            <tr><th>Employees</th><td>${data.employees}</td></tr>
                            <tr><th>CEO</th><td>${data.ceo}</td></tr>
                            <tr><th>Valuation</th><td>$${data.valuation.toLocaleString()}</td></tr>
                            <tr><th>Summary</th><td class="summary">${data.summary}</td></tr>
                            <tr><th>Headquarters</th><td>${data.headquarters.address}, ${data.headquarters.city}, ${data.headquarters.state}</td></tr>
                            <tr><th>Links</th><td>
                                <a href="${data.links.website}" target="_blank">Website</a>,
                                <a href="${data.links.twitter}" target="_blank">Twitter</a>,
                                <a href="${data.links.elon_twitter}" target="_blank">Elon's Twitter</a>
                            </td></tr>
                        </table>
                        <img src="/storage/img/Elon_Musk_(3018710552).jpg" alt="SpaceX Headquarters">
                    </div>
                </div>
            `;

            container.innerHTML = companyHtml;
        })
        .catch(error => {
            console.error("Error fetching company data:", error);
        });
}


