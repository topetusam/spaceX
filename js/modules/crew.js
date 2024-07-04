let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/crew")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderCrew(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching crew data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un miembro de la tripulación por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderCrew(data, container) {
    const crewHtml = data.map(member => `
        <div class="crew-member">
            <img src="${member.image}" alt="${member.name}" referrerPolicy="no-referrer">
            <div class="crew-info">
                <h2>${member.name}</h2>
                <table>
                    <tr>
                        <th>Agency:</th>
                        <td>${member.agency}</td>
                    </tr>
                    <tr>
                        <th>Status:</th>
                        <td>${member.status}</td>
                    </tr>
                    <tr>
                        <th>Launches:</th>
                        <td>${member.launches.length}</td>
                    </tr>
                    <tr>
                        <th>Wikipedia:</th>
                        <td><a href="${member.wikipedia}" target="_blank">${member.wikipedia}</a></td>
                    </tr>
                    <tr>
                        <th>Twitter:</th>
                        <td><a href="${member.twitter}" target="_blank">${member.twitter}</a></td>
                    </tr>
                    <tr>
                        <th>Instagram:</th>
                        <td><a href="${member.instagram}" target="_blank">${member.instagram}</a></td>
                    </tr>
                    <tr>
                        <th>Facebook:</th>
                        <td><a href="${member.facebook}" target="_blank">${member.facebook}</a></td>
                    </tr>
                </table>
            </div>
        </div>
    `).join('');

    container.innerHTML = crewHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un miembro de la tripulación por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `<div id="paginationAll">`;
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
