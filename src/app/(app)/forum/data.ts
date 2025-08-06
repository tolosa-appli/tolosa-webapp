

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

const themeImageMap: { [key: string]: string } = {
    // Thèmes Généraux
    'Aide help utilisation': 'http://bilingue31.free.fr/forum_aide_GO_300x200.jpg',
    'Bénévolat Volontariat': 'http://bilingue31.free.fr/forum_benevol_OK.jpg',
    'Débats Actualités Opinion': 'http://bilingue31.free.fr/forum_debats_OK.jpg',
    'Écologie et Social': 'http://bilingue31.free.fr/forum_Ecologie_OK.jpg',
    'Entraide': 'http://bilingue31.free.fr/forum_Entraide_1_OK.jpg',
    'Philo': 'http://bilingue31.free.fr/forum_Philo_1_OK.jpg',
    'Psycho': 'http://bilingue31.free.fr/forum_psycho_1_OK.jpg',
    // Sorties & Activités
    'Afterwork': 'http://bilingue31.free.fr/forum_afterwork_300x200.jpg',
    'Aller au théâtre': 'http://bilingue31.free.fr/forum_aller_theatre_300x200.jpg',
    'Balade randonnée visite': 'http://bilingue31.free.fr/forum_rando_visite_OK.jpg',
    'Brunch': 'http://bilingue31.free.fr/forum_Brunch_OK.jpg',
    'Camping': 'http://bilingue31.free.fr/forum_camping_OK.jpg',
    'Cinéma': 'http://bilingue31.free.fr/forum_cinema_OK.jpg',
    'Concert': 'http://bilingue31.free.fr/forum_concert_1_OK.jpg',
    'Danse': 'http://bilingue31.free.fr/forum_danse_OK.jpg',
    'Discothèque': 'http://bilingue31.free.fr/forum_discotheque_OK.jpg',
    'Humour': 'http://bilingue31.free.fr/forum_Humour_OK.jpg',
    'Jeux': 'http://bilingue31.free.fr/forum_Jeux_1_OK.jpg',
    'Pique-Nique': 'http://bilingue31.free.fr/forum_piquenique_OK.jpg',
    'Piscine': 'http://bilingue31.free.fr/forum_piscine_OK.jpg',
    'Restaurant': 'http://bilingue31.free.fr/forum_restaurant_OK.jpg',
    'Ski': 'http://bilingue31.free.fr/forum_Ski_OK.jpg',
    'Soirées Sorties': 'http://bilingue31.free.fr/forum_soirees_300x200.jpg',
    'Sport': 'http://bilingue31.free.fr/forum_Sport_1_OK.jpg',
    'Tchatter en ligne': 'http://bilingue31.free.fr/forum_Tchatter_OK.jpg',
    'Visiter Toulouse': 'http://bilingue31.free.fr/forum_plan_1_OK.jpg',
    'Voir match de sport': 'http://bilingue31.free.fr/forum_voirmatchsport_OK.jpg',
    'Voyage': 'http://bilingue31.free.fr/forum_Voyage_OK.jpg',
    'Vélo': 'http://bilingue31.free.fr/forum_velo_300x200.jpg',
    'Week-end': 'http://bilingue31.free.fr/forum_WeekEnd_OK.jpg',
    // Communautés
    'Décide des sorties': 'http://bilingue31.free.fr/forum_gens_froid_OK.jpg',
    'Développeurs informatique': 'http://bilingue31.free.fr/forum_developpeur_OK.jpg',
    'ERASMUS': 'http://bilingue31.free.fr/forum_ERASMUS_1_OK.jpg',
    'Salon de thé entre filles': 'http://bilingue31.free.fr/forum_SalonTheFilles_OK.jpg',
    'Sorties entre filles': 'http://bilingue31.free.fr/forum_sortiesFilles_1_OK.jpg',
    'Sport entre filles': 'http://bilingue31.free.fr/forum_SportFilles_OK.jpg',
    // Événements Spéciaux
    'Chandeleur': 'http://bilingue31.free.fr/forum_chandeleur_300x200.jpg',
    'Halloween': 'http://bilingue31.free.fr/forum_Halloween_OK.jpg',
    'Organisation': 'http://bilingue31.free.fr/forum_organise_1_OK.jpg',
    'Réveillon de Noël': 'http://bilingue31.free.fr/forum_Noel_1_OK.jpg',
    'Réveillon du nouvel An': 'http://bilingue31.free.fr/forum_NouvelAn_1_OK.jpg',
    'Toulousaine Girls Party': 'http://bilingue31.free.fr/forum_SortieFilles_OK.jpg',
    // Arts & Culture
    'Art': 'http://bilingue31.free.fr/forum_peinture_art_300x200.jpg',
    'Arts plastiques et décoratifs': 'http://bilingue31.free.fr/forum_art_plastic_300x200.jpg',
    'Atelier d\'écriture': 'http://bilingue31.free.fr/forum_ecriture_GO_300x200.jpg',
    'Chant et chanson': 'http://bilingue31.free.fr/forum_chant_OK.jpg',
    'Club de lecture': 'http://bilingue31.free.fr/forum_Club_Lecture_OK.jpg',
    'Couture et crochet': 'http://bilingue31.free.fr/forum_couture_300x200.jpg',
    'Cuisine': 'http://bilingue31.free.fr/forum_cuisine_OK.jpg',
    'Design numérique': 'http://bilingue31.free.fr/forum_art_num_300x200.jpg',
    'Dessin et peinture': 'http://bilingue31.free.fr/forum_dessin_1_OK.jpg',
    'Impro': 'http://bilingue31.free.fr/forum_Impro_1_OK.jpg',
    'Jardinage': 'http://bilingue31.free.fr/forum_jardinage_1_300x200.jpg',
    'Magie et marionnettes': 'http://bilingue31.free.fr/forum_Magie_OK.jpg',
    'Musique': 'http://bilingue31.free.fr/forum_Musique_OK.jpg',
    'Photographie': 'http://bilingue31.free.fr/forum_photo_1_OK.jpg',
    'photos insolites Occitanie': 'http://bilingue31.free.fr/forum_photo_inso_1_OK.jpg',
    'Poterie et sculpture': 'http://bilingue31.free.fr/forum_poterie_OK.jpg',
    'Vernissage Inauguration': 'http://bilingue31.free.fr/forum_Vernissage_OK.jpg',
    'Vidéo et casting': 'http://bilingue31.free.fr/forum_casting_1_OK.jpg',
    // Bien-Être
    'Bien-Être': 'http://bilingue31.free.fr/forum_Bien_Etre_1_OK.jpg',
    'Spiritualité': 'http://bilingue31.free.fr/forum_Spiritualite_OK.jpg',
    'Yoga': 'http://bilingue31.free.fr/forum_yoga_15_OK.jpg',
    // Services & Annonces
    'Bons Plans pas cher gratuit': 'http://bilingue31.free.fr/forum_Bon_Plan_OK.jpg',
    'Covoiturage': 'http://bilingue31.free.fr/forum_covoiturage_300x200.jpg',
    'Emploi': 'http://bilingue31.free.fr/forum_Emploi_1_OK.jpg',
    'Logement': 'http://bilingue31.free.fr/forum_Logement_1_OK.jpg',
    'Petites Annonces': 'http://bilingue31.free.fr/forum_petiteAnnonce_1_OK.jpg',
    'Stage & Alternance': 'http://bilingue31.free.fr/forum_stage_300x200.jpg',
    // Autour de Toulouse
    'Baigande au lac': 'http://bilingue31.free.fr/forum_Balade_Lac_Plage_OK.jpg',
    'Baignade à la mer': 'http://bilingue31.free.fr/forum_mer_OK_300x200.jpg',
    'Balade en Espagne': 'http://bilingue31.free.fr/forum_Balade_Espagne_OK.jpg',
    'Balade en forêt': 'http://bilingue31.free.fr/forum_Balade_Foret_OK.jpg',
    'Covoiturage sorties': 'http://bilingue31.free.fr/forum_sortie_coivitur_OK.jpg',
    'Sortie au village des marques à Nailloux': 'http://bilingue31.free.fr/forum_Nailloux_OK.jpg',
    'Sortie cueillette': 'http://bilingue31.free.fr/forum_ceuillette_OK.jpg',
    'Sortie en Andorre': 'http://bilingue31.free.fr/forum_Andorre_300x200.jpg',
    'Sortie en Occitanie': 'http://bilingue31.free.fr/forum_Occitanie_1_OK.jpg',
    'Toulouse train 1 euro': 'http://bilingue31.free.fr/forum_TrainTGV_OK.jpg',
    'Voyage Week-end': 'http://bilingue31.free.fr/forum_voyage_week_1_300x200.jpg',
    // Autres
    'Coworking': 'http://bilingue31.free.fr/forum_Coworking_OK.jpg',
    'Morning Coffee': 'http://bilingue31.free.fr/forum_MorningCoffee_OK.jpg',
    'Nature Botanique': 'http://bilingue31.free.fr/forum_Nature_OK.jpg',
    'Organisateurs': 'http://bilingue31.free.fr/forum_Organisateur_OK.jpg',
    'Questionnaires (mémoire, thèse, autre), étude, expérience': 'http://bilingue31.free.fr/forum_questions_300x200.jpg',
    // Échanges Linguistiques
    'Café des langues': 'http://bilingue31.free.fr/forum_cafe_des_langues_OK.jpg',
    'Café des langues en visio': 'http://bilingue31.free.fr/forum_Visio_OK.jpg',
    'Conversation en français': 'http://bilingue31.free.fr/drapeau_France_OK.jpg',
    'Cours de langues': 'http://bilingue31.free.fr/forum_CoursLangues_OK.jpg',
    'Échange Cours de langues': 'http://bilingue31.free.fr/forum_Langues_1_OK.jpg',
    'Échange français albanais': 'http://bilingue31.free.fr/drapeau_Albanie_OK.jpg',
    'Échange français allemand': 'http://bilingue31.free.fr/drapeau_Allemagne_OK.jpg',
    'Échange français anglais': 'http://bilingue31.free.fr/drapeau_Royaume_Uni_OK.jpg',
    'Échange français arabe': 'http://bilingue31.free.fr/drapeau_Arabe_OK.jpg',
    'Échange français aragonais': 'http://bilingue31.free.fr/drapeau_Aragon_OK.jpg',
    'Échange français arménien': 'http://bilingue31.free.fr/drapeau_Armenie_OK.jpg',
    'Échange français azerbaïdjanais': 'http://bilingue31.free.fr/drapeau_Azerbaijan_OK.jpg',
    'Échange français Basque': 'http://bilingue31.free.fr/drapeau_Pays_Bas_OK.jpg',
    'Échange français berbère': 'http://bilingue31.free.fr/drapeau_berbere_OK.jpg',
    'Échange français bulgare': 'http://bilingue31.free.fr/drapeau_Bulgarie_OK.jpg',
    'Échange français catalan': 'http://bilingue31.free.fr/drapeau_Catalogne_OK.jpg',
    'Échange français chinois': 'http://bilingue31.free.fr/drapeau_Chine_OK.jpg',
    'Échange français coréen': 'http://bilingue31.free.fr/drapeau_Coree_Sud_OK.jpg',
    'Échange français créole': 'http://bilingue31.free.fr/drapeau_Creole_OK.jpg',
    'Échange français danois, norvégien, suédois': 'http://bilingue31.free.fr/drapeau_Scandinavie_OK.jpg',
    'Échange français espagnol': 'http://bilingue31.free.fr/drapeau_Espagne_OK.jpg',
    'Échange français espéranto': 'http://bilingue31.free.fr/drapeau_Esperanto_OK.jpg',
    'Échange français farci perse': 'http://bilingue31.free.fr/drapeau_Iran_OK.jpg',
    'Échange français finois estonien': 'http://bilingue31.free.fr/drapeau_Finlande_Estonie_OK.jpg',
    'Échange français géorgien': 'http://bilingue31.free.fr/drapeau_Georgie_OK.jpg',
    'Échange français grec': 'http://bilingue31.free.fr/drapeau_Grece_OK.jpg',
    'Échange français hébreu': 'http://bilingue31.free.fr/drapeau_Israel_OK.jpg',
    'Échange français hindi tamoul': 'http://bilingue31.free.fr/drapeau_Inde_OK.jpg',
    'Échange français hongrois': 'http://bilingue31.free.fr/drapeau_Hongrie_OK.jpg',
    'Échange français indonésien': 'http://bilingue31.free.fr/drapeau_Indonesie_OK.jpg',
    'Échange français italien': 'http://bilingue31.free.fr/drapeau_Italie_OK.jpg',
    'Échange français japonais': 'http://bilingue31.free.fr/drapeau_Japon_OK.jpg',
    'Échange français langue étrangère FLE': 'http://bilingue31.free.fr/drapeau_France_FLE_OK.jpg',
    'Échange français Langue des signes': 'http://bilingue31.free.fr/drapeau_Langue_Signes_OK.jpg',
    'Échange français néerlandais': 'http://bilingue31.free.fr/drapeau_Pays_Basque_OK.jpg',
    'Échange français occitan': 'http://bilingue31.free.fr/drapeau_Occitanie_OK.jpg',
    'Échange français polonais': 'http://bilingue31.free.fr/drapeau_Pologne_OK.jpg',
    'Échange français portugais brésilien': 'http://bilingue31.free.fr/drapeau_Portugal_Bresil_OK.jpg',
    'Échange français roumain': 'http://bilingue31.free.fr/drapeau_Roumanie_OK.jpg',
    'Échange français russe': 'http://bilingue31.free.fr/drapeau_Russie_OK.jpg',
    'Échange français serbe croate': 'http://bilingue31.free.fr/drapeau_Croate_Serbe_OK.jpg',
    'Échange français slovaque tchèque': 'http://bilingue31.free.fr/drapeau_Tcheque_Slovaque_OK.jpg',
    'Échange français turc': 'http://bilingue31.free.fr/drapeau_Turquie_OK.jpg',
    'Échange français ukrainien': 'http://bilingue31.free.fr/drapeau_Ukraine_OK.jpg',
    'Échange français vietnamien': 'http://bilingue31.free.fr/drapeau_Vietnam_OK.jpg',
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
        image: themeImageMap[name] || 'https://placehold.co/300x200.png',
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
            'Art', 'Arts plastiques et décoratifs', 'Atelier d\'écriture', 'Chant et chanson', 'Club de lecture', 'Couture et crochet', 'Cuisine', 'Design numérique', 'Dessin et peinture', 'Impro', 'Jardinage', 'Magie et marionnettes', 'Musique', 'Photographie', 'photos insolites Occitanie', 'Poterie et sculpture', 'Vernissage Inauguration', 'Vidéo et casting'
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
            'Café des langues', 'Café des langues en visio', 'Conversation en français', 'Cours de langues', 'Échange Cours de langues', 'Échange français albanais', 'Échange français allemand', 'Échange français anglais', 'Échange français arabe', 'Échange français aragonais', 'Échange français arménien', 'Échange français azerbaïdjanais', 'Échange français Basque', 'Échange français berbère', 'Échange français bulgare', 'Échange français catalan', 'Échange français chinois', 'Échange français coréen', 'Échange français créole', 'Échange français danois, norvégien, suédois', 'Échange français espagnol', 'Échange français espéranto', 'Échange français farci perse', 'Échange français finois estonien', 'Échange français géorgien', 'Échange français grec', 'Échange français hébreu', 'Échange français hindi tamoul', 'Échange français hongrois', 'Échange français indonésien', 'Échange français italien', 'Échange français japonais', 'Échange français langue étrangère FLE', 'Échange français Langue des signes', 'Échange français néerlandais', 'Échange français occitan', 'Échange français polonais', 'Échange français portugais brésilien', 'Échange français roumain', 'Échange français russe', 'Échange français serbe croate', 'Échange français slovaque tchèque', 'Échange français turc', 'Échange français ukrainien', 'Échange français vietnamien'
        ])
    }
];
