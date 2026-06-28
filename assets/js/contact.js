/* ===== Animations au scroll pour la page Contact =====
   Fait apparaître en fondu/translation les blocs marqués data-animate
   dès qu'ils entrent dans la zone visible de l'écran.
*/

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    // Si IntersectionObserver n'est pas supporté, on affiche tout directement
    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(el => observer.observe(el));
});

/* ===== Gestion basique du formulaire (pas de backend pour l'instant) =====
   Empêche le rechargement de page et affiche une confirmation simple.
   À remplacer plus tard par un vrai envoi (Formspree, EmailJS, backend, etc.)
*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // TODO: remplacer cette alerte par un vrai envoi du formulaire
        alert('Merci pour votre message ! Nous vous répondrons rapidement.');
        form.reset();
    });
});