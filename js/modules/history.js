// js/modules/history.js

let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/history")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderHistory(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching history data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un evento por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderHistory(data, container) {
    const historyHtml = data.map(event => `
        <div class="history-event">
            <h2>${event.title}</h2>
            <p>Date: ${new Date(event.event_date_utc).toLocaleDateString()}</p>
            <p>Details: ${event.details}</p>
            <p>Flight Number: ${event.flight ? event.flight : 'N/A'}</p>
            <p>Article: <a href="${event.links.article}" target="_blank">${event.links.article}</a></p>
            <p>Wikipedia: <a href="${event.links.wikipedia}" target="_blank">${event.links.wikipedia}</a></p>
        </div>
    `).join('');

    container.innerHTML = historyHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un evento por página
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
