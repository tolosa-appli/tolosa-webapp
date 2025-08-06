

// Helper to create URL-friendly slugs from theme names
const toSlug = (name: string): string => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return name.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const getAiHint = (name: string): string => {
    const keywords = name.toLowerCase()
        .replace(/ et /g, ' ')
        .replace(/, /g, ' ')
        .replace(/ & /g, ' ');
    return keywords.split(' ').slice(0, 2).join(' ');
};

interface Theme {
    name: string;
    slug: string;
    image: string;
    dataAiHint: string;
}

interface Category {
    name: string;
    themes: Theme[];
}

const createThemes = (themeNames: string[]): Theme[] => {
    return themeNames.sort((a, b) => a.localeCompare(b)).map(name => ({
        name,
        slug: toSlug(name),
        image: 'https://placehold.co/300x200.png',
        dataAiHint: getAiHint(name),
    }));
};

export const forumCategories: Category[] = [
    {
        name: 'Thèmes Généraux',
        themes: createThemes([
            'Aide help utilisation', 'Bénévolat Volontariat', 'Débats Actualités Opinion', 'Écologie et Social', 'Entraide', 'Philo', 'Psycho'
        ])
    },
    {
        name: 'Sorties & Activités',
        themes: createThemes([
            'Afterwork', 'Aller au théâtre', 'Balade randonnée visite', 'Brunch', 'Camping', 'Cinéma', 'Concert', 'Danse', 'Discothèque', 'Humour', 'Jeux', 'Pique-Nique', 'Piscine', 'Restaurant', 'Ski', 'Soirées Sorties', 'Sport', 'Tchatter en ligne', 'Visiter Toulouse', 'Voir match de sport', 'Voyage', 'Vélo', 'Week-end'
        ])
    },
    {
        name: 'Communautés',
        themes: createThemes([
            'Décide des sorties', 'Développeurs informatique', 'ERASMUS', 'Salon de thé entre filles', 'Sorties entre filles', 'Sport entre filles'
        ])
    },
    {
        name: 'Événements Spéciaux',
        themes: createThemes([
            'Chandeleur', 'Halloween', 'Organisation', 'Réveillon de Noël', 'Réveillon du nouvel An', 'Toulousaine Girls Party'
        ])
    },
    {
        name: 'Arts & Culture',
        themes: createThemes([
            'Art', 'Arts plastiques et décoratifs', 'Atelier d\'écriture', 'Chant et chanson', 'Club de lecture', 'Cuisine', 'Design numérique', 'Dessin et peinture', 'Impro', 'Jardinage', 'Magie et marionnettes', 'Musique', 'Photographie', 'photos insolites Occitanie', 'Poterie et sculpture', 'Vernissage Inauguration', 'Vidéo et casting'
        ])
    },
    {
        name: 'Bien-Être',
        themes: createThemes([
            'Bien-Être', 'Spiritualité', 'Yoga'
        ])
    },
    {
        name: 'Services & Annonces',
        themes: createThemes([
            'Bons Plans pas cher gratuit', 'Covoiturage', 'Emploi', 'Logement', 'Petites Annonces', 'Stage & Alternance'
        ])
    },
    {
        name: 'Autour de Toulouse',
        themes: createThemes([
            'Baigande au lac', 'Baignade à la mer', 'Balade en Espagne', 'Balade en forêt', 'Covoiturage sorties', 'Sortie cueillette', 'Sortie en Occitanie', 'Sortie au village des marques à Nailloux', 'Sortie en Andorre', 'Toulouse train 1 euro', 'Voyage Week-end'
        ])
    },
    {
        name: 'Autres',
        themes: createThemes([
            'Coworking', 'Morning Coffee', 'Nature Botanique', 'Organisateurs', 'Questionnaires (mémoire, thèse, autre), étude, expérience'
        ])
    },
    {
        name: 'Échanges Linguistiques',
        themes: createThemes([
            'Café des langues', 'Café des langues en visio', 'Conversation en français', 'Cours de langues', 'Échange Cours de langues', 'Échange français albanais', 'Échange français allemand', 'Échange français anglais', 'Échange français arabe', 'Échange français arménien', 'Échange français azerbaïdjanais', 'Échange français Basque', 'Échange français berbère', 'Échange français bulgare', 'Échange français chinois', 'Échange français coréen', 'Échange français créole', 'Échange français danois, norvégien, suédois', 'Échange français espagnol', 'Échange français espéranto', 'Échange français farci perse', 'Échange français finois estonien', 'Échange français géorgien', 'Échange français hébreu', 'Échange français hindi tamoul', 'Échange français indonésien', 'Échange français italien', 'Échange français japonais', 'Échange français langue étrangère FLE', 'Échange français Langue des signes', 'Échange français néerlandais', 'Échange français occitan', 'Échange français polonais', 'Échange français portugais brésilien', 'Échange français roumain', 'Échange français russe', 'Échange français serbe croate', 'Échange français slovaque tchèque', 'Échange français turc', 'Échange français ukrainien', 'Échange français vietnamien'
        ])
    }
];
