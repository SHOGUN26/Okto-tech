//Permet d'afficher le menu burger sur les autres supports.
const burger = document.getElementById('burger');
const nav = document.querySelector('header nav');

burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
});


// Récupère le bouton "retour en haut" dans le DOM
const scrollTopBtn = document.getElementById('scrollTop');

// Écoute le scroll : affiche le bouton après 300px, le masque sinon
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('is-visible');
  } else {
    scrollTopBtn.classList.remove('is-visible');
  }
});

// Au clic, remonte en douceur vers le haut de la page
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});