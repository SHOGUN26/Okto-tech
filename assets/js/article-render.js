/* ===== Rendu de la page article.html =====
   Lit l'id du projet dans l'URL (?id=...) et affiche son contenu complet
   depuis projectsData (projects-data.js).
*/

function renderArticle(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);

    const project = projectsData.find(p => p.id === id);

    if (!project) {
        container.innerHTML = `
            <div class="article-not-found">
                <h2>Article introuvable</h2>
                <p>Cet article n'existe pas ou a été retiré.</p>
            </div>
        `;
        return;
    }

    const paragraphs = project.content
        .split('\n\n')
        .map(p => `<p class="article-paragraph">${p}</p>`)
        .join('');

    container.innerHTML = `
        <article class="article-full">
            <img src="${project.image}" alt="${project.title}" class="article-image">
            <div class="article-meta">
                <span class="project-avatar"></span>
                <div>
                    <span class="project-author">${project.author}</span>
                    <span class="project-date">${project.dateLabel}</span>
                </div>
            </div>
            <h1 class="article-title">${project.title}</h1>
            <div class="article-content">
                ${paragraphs}
            </div>
        </article>
    `;

    document.title = `${project.title} — OKTO Technologies`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderArticle('[data-article-container]');
});