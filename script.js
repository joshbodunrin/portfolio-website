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
            html += `
                <div class="about-content">
                    <img src="${tabContent.photoUrl}" alt="My Photo" class="profile-photo">
                    <p class="about-text">${tabContent.content}</p>
                </div>
                `;
        } else if (tabId === 'projects') {
            tabContent.items.forEach(project => {
                html += `
                    <div class="project">
                        <h2>${project.name}</h2>
                        <p>${project.description}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    </div>
                `;
            });
        } else if (tabId === 'contact') {
            html += `<p>Email: ${tabContent.email}</p>`;
            html += `<p>Phone: ${tabContent.phone}</p>`;
        }

        html += '</section>';
        contentDiv.innerHTML = html;
    }
});