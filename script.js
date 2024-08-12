document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const contentDiv = document.getElementById('content');
    let contentData;

    // Fetch the content from the JSON file
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            contentData = data;
            // Set the first tab as active by default
            showTab('about');
        })
        .catch(error => console.error('Error loading content:', error));

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    function showTab(tabId) {
        if (!contentData) return;

        const tabContent = contentData[tabId];
        let html = `<section id="${tabId}" class="tab-content active">`;
        html += `<h1>${tabContent.title}</h1>`;

        if (tabId === 'about') {
            html += `<p>${tabContent.content}</p>`;
        } else if (tabId === 'projects') {
            html += '<ul>';
            tabContent.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        } else if (tabId === 'contact') {
            html += `<p>Email: ${tabContent.email}</p>`;
            html += `<p>Phone: ${tabContent.phone}</p>`;
        }

        html += '</section>';
        contentDiv.innerHTML = html;
    }
});