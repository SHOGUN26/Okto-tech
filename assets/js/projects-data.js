/* ===== Données des projets / articles (Infos et actus) =====
   Pour ajouter un nouveau projet, copiez un objet et modifiez ses valeurs.
   La date doit être au format "AAAA-MM-JJ" pour permettre le tri chronologique.

   - excerpt : court résumé affiché sur les cartes (accueil + liste actu)
   - content : texte complet affiché sur la page article.html
               (peut contenir plusieurs paragraphes séparés par \n\n)

   NOTE : les entrées ci-dessous sont des données DE TEST (textes et images
   de remplissage) pour vérifier que le tri par date et les liens vers
   article.html fonctionnent bien avec plusieurs projets différents.
   Remplacez progressivement chaque champ par le vrai contenu.
   Les images viennent d'Unsplash (libres de droits) en attendant vos propres photos.
*/
const projectsData = [
    {
        id: 1,
        image: "assets/images/reunion1.avif",
        author: "Braino",
        date: "2025-03-02",
        dateLabel: "2 mars 2025",
        title: "Réunion des Chefs de Départements",
        excerpt: "Prise de contacts. Echanges Divers. CAN 2025 U20.",
        // TEXTE DE REMPLISSAGE — à remplacer par le vrai contenu de l'article
        content: "Prise de contacts. Echanges Divers. CAN 2025 U20.\n\n[Texte de remplissage à éditer dans projects-data.js — remplacez ce paragraphe par le contenu complet de l'article décrivant la réunion des Chefs de Départements, ses objectifs, les sujets abordés et les décisions prises.]"
    },
    {
        id: 2,
        // IMAGE DE TEST (Unsplash) — à remplacer par une vraie photo dans assets/images/
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
        author: "Braino",
        date: "2025-04-15",
        dateLabel: "15 avril 2025",
        title: "Lancement de la Nouvelle Plateforme Digitale",
        excerpt: "Mise en ligne officielle. Premiers retours clients très positifs.",
        // TEXTE DE REMPLISSAGE — à remplacer par le vrai contenu de l'article
        content: "Mise en ligne officielle. Premiers retours clients très positifs.\n\n[Texte de remplissage à éditer dans projects-data.js — décrivez ici les fonctionnalités de la plateforme, le contexte du lancement et les prochaines étapes prévues.]"
    },
    {
        id: 3,
        // IMAGE DE TEST (Unsplash) — à remplacer par une vraie photo dans assets/images/
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
        author: "Braino",
        date: "2025-05-20",
        dateLabel: "20 mai 2025",
        title: "Formation Interne sur les Nouvelles Technologies",
        excerpt: "Une journée dédiée à la montée en compétences des équipes.",
        // TEXTE DE REMPLISSAGE — à remplacer par le vrai contenu de l'article
        content: "Une journée dédiée à la montée en compétences des équipes.\n\n[Texte de remplissage à éditer dans projects-data.js — détaillez ici le programme de la formation, les intervenants et les retours des participants.]"
    },
    {
        id: 4,
        // IMAGE DE TEST (Unsplash) — à remplacer par une vraie photo dans assets/images/
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
        author: "Braino",
        date: "2025-06-10",
        dateLabel: "10 juin 2025",
        title: "Partenariat Stratégique Signé avec un Acteur Régional",
        excerpt: "Une étape clé pour renforcer notre présence sur le marché.",
        // TEXTE DE REMPLISSAGE — à remplacer par le vrai contenu de l'article
        content: "Une étape clé pour renforcer notre présence sur le marché.\n\n[Texte de remplissage à éditer dans projects-data.js — expliquez ici les termes du partenariat, les bénéfices attendus et les perspectives à venir.]"
    },
    {
        id: 5,
        // IMAGE DE TEST (Unsplash) — à remplacer par une vraie photo dans assets/images/
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
        author: "Braino",
        date: "2025-06-25",
        dateLabel: "25 juin 2025",
        title: "Participation au Salon Régional de l'Innovation",
        excerpt: "OKTO présente ses solutions devant un large public professionnel.",
        // TEXTE DE REMPLISSAGE — à remplacer par le vrai contenu de l'article
        content: "OKTO présente ses solutions devant un large public professionnel.\n\n[Texte de remplissage à éditer dans projects-data.js — décrivez ici le déroulement du salon, le stand OKTO, les rencontres faites et les retombées attendues.]"
    },
    {
        id: 6,
        // IMAGE DE TEST (Unsplash) — à remplacer par une vraie photo dans assets/images/
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
        author: "Braino",
        date: "2025-07-08",
        dateLabel: "8 juillet 2025",
        title: "Recrutement de Nouveaux Talents pour l'Équipe Technique",
        excerpt: "Plusieurs postes pourvus pour accompagner notre croissance.",
        // TEXTE DE REMPLISSAGE — à remplacer par le vrai contenu de l'article
        content: "Plusieurs postes pourvus pour accompagner notre croissance.\n\n[Texte de remplissage à éditer dans projects-data.js — présentez ici les nouveaux profils recrutés, leurs missions et les ambitions de l'équipe technique.]"
    },
    {
        id: 7,
        // IMAGE DE TEST (Unsplash) — à remplacer par une vraie photo dans assets/images/
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        author: "Braino",
        date: "2025-07-22",
        dateLabel: "22 juillet 2025",
        title: "Bilan du Premier Semestre 2025",
        excerpt: "Retour sur les principales réalisations des six derniers mois.",
        // TEXTE DE REMPLISSAGE — à remplacer par le vrai contenu de l'article
        content: "Retour sur les principales réalisations des six derniers mois.\n\n[Texte de remplissage à éditer dans projects-data.js — résumez ici les chiffres clés, les projets marquants et les objectifs fixés pour la suite de l'année.]"
    }
];