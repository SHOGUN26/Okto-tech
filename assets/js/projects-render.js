/* ===== Rendu des cartes "Derniers Projets" =====
   Réutilisable sur la page d'accueil et sur la page "Infos et actus".
   Affiche toujours les 3 projets les plus récents (triés par date décroissante).
*/

function renderLatestProjects(containerSelector, maxItems = 3) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const sorted = [...projectsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = sorted.slice(0, maxItems);

    container.innerHTML = latest.map(project => `
        <article class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-body">
                <div class="project-meta">
                    <span class="project-avatar"></span>
                    <div>
                        <span class="project-author">${project.author}</span>
                        <span class="project-date">${project.dateLabel}</span>
                    </div>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-excerpt">${project.excerpt}</p>
                <div class="project-stats">
                    <span class="stat-views">👁 ${project.views}</span>
                    <span class="stat-comments">💬 ${project.comments}</span>
                    <span class="stat-like">❤️</span>
                </div>
            </div>
        </article>
    `).join('');
}

/* Initialisation automatique au chargement de la page :
   cherche un conteneur portant l'attribut data-latest-projects */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-latest-projects]');
    if (container) {
        renderLatestProjects('[data-latest-projects]', 3);
    }
});