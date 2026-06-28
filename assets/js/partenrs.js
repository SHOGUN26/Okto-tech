/* ===== Affichage progressif des logos partenaires =====
   Au chargement : seuls les 4 premiers logos (sans classe .partner-logo-extra)
   sont visibles. Le clic sur le bouton "Plus" révèle tous les logos
   supplémentaires (.partner-logo-extra) et transforme le bouton en "Moins".
   Cliquer sur "Moins" les masque à nouveau et redonne le label "Plus". */

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('partners-toggle-btn');
    if (!toggleBtn) return;

    let expanded = false;

    toggleBtn.addEventListener('click', () => {
        expanded = !expanded;

        document.querySelectorAll('.partner-logo-extra').forEach(logo => {
            logo.classList.toggle('is-visible', expanded);
        });

        toggleBtn.textContent = expanded ? 'Moins' : 'Plus';
    });
});