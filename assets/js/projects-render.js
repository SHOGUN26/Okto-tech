/* ===== Rendu des cartes "Derniers Projets" =====
   Réutilisable sur la page d'accueil et sur la page "Infos et actus".

   Nombre d'articles affichés :
     - page d'accueil (index.html) -> 3 derniers articles seulement
     - page actu.html -> TOUS les articles, sauf si on précise un nombre
       via data-max-items sur le conteneur

   linkTarget :
     - "list"    -> chaque carte renvoie vers actu.html (utilisé sur index.html)
     - "article" -> chaque carte renvoie vers article.html?id=... (utilisé sur actu.html)
*/

function renderLatestProjects(containerSelector, maxItems = 3, linkTarget = 'article') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const sorted = [...projectsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = sorted.slice(0, maxItems);

    container.innerHTML = latest.map(project => {
        const href = linkTarget === 'list'
            ? 'actu.html'
            : `article.html?id=${project.id}`;

        return `
        <a class="project-card-link" href="${href}">
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
                </div>
            </article>
        </a>
    `;
    }).join('');
}

/* Initialisation automatique au chargement de la page :
   cherche un conteneur portant l'attribut data-latest-projects.
   - La cible des liens est déduite via data-link-target, sinon du nom de fichier.
   - Le nombre d'articles est déduit via data-max-items ("all" ou un nombre),
     sinon 3 sur la page d'accueil et "tous" sur les autres pages (ex: actu.html). */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-latest-projects]');
    if (container) {
        const explicitTarget = container.getAttribute('data-link-target');
        const isHomePage = /(^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith('/');
        const linkTarget = explicitTarget || (isHomePage ? 'list' : 'article');

        const explicitMax = container.getAttribute('data-max-items');
        let maxItems;
        if (explicitMax === 'all') {
            maxItems = Infinity;
        } else if (explicitMax) {
            maxItems = parseInt(explicitMax, 10);
        } else {
            maxItems = isHomePage ? 3 : Infinity;
        }

        renderLatestProjects('[data-latest-projects]', maxItems, linkTarget);
    }
});