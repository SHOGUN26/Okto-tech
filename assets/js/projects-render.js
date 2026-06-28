/* ===== Rendu des cartes "Derniers Projets" =====
   Réutilisable sur la page d'accueil et sur la page "Infos et actus".

   Nombre d'articles affichés :
     - page d'accueil (index.html) -> 3 derniers articles seulement
     - page actu.html -> TOUS les articles, sauf si on précise un nombre
       via data-max-items sur le conteneur

   linkTarget :
     - "list"    -> chaque carte renvoie vers actu.html (liste complète des articles)
     - "article" -> chaque carte renvoie vers article.html?id=... (lecture de l'article)
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

   - La cible des liens (data-link-target) est PRIORITAIRE si elle est précisée
     dans le HTML : utilisez "article" pour renvoyer vers la lecture de l'article,
     ou "list" pour renvoyer vers la page actu.html.
   - Si data-link-target n'est pas précisé, on déduit un comportement par défaut
     SANS JAMAIS rediriger par erreur vers actu.html depuis cette page elle-même :
       -> sur actu.html : "article" (cliquer sur une carte ouvre l'article)
       -> sur les autres pages (ex: index.html) : "list" (cliquer renvoie vers la liste)
   - Le nombre d'articles est déduit via data-max-items ("all" ou un nombre),
     sinon 3 sur la page d'accueil et "tous" (Infinity) sur les autres pages. */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-latest-projects]');
    if (!container) return;

    const path = window.location.pathname;
    const isActuPage = /(^|\/)actu\.html$/.test(path);
    const isHomePage = /(^|\/)index\.html$/.test(path) || path.endsWith('/');

    const explicitTarget = container.getAttribute('data-link-target');
    const linkTarget = explicitTarget || (isActuPage ? 'article' : 'list');

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
});