/* =====================================================
   MEDIC INFO GABON
   APPLICATION JAVASCRIPT
===================================================== */


/* =====================================================
   ÉTAT DE L'APPLICATION
===================================================== */

let provinceActive = "";
let typeRecherche = "";
let donneesActuelles = [];


/* =====================================================
   PROVINCES
===================================================== */

const provinces = [
    "Estuaire",
    "Haut-Ogooué",
    "Moyen-Ogooué",
    "Ngounié",
    "Nyanga",
    "Ogooué-Ivindo",
    "Ogooué-Lolo",
    "Ogooué-Maritime",
    "Woleu-Ntem"
];


/* =====================================================
   AFFICHER UNE PAGE
===================================================== */

function afficherPage(id) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(id);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   ACCUEIL
===================================================== */

function retourAccueil() {

    // Réinitialiser complètement la navigation
    provinceActive = "";
    typeRecherche = "";
    donneesActuelles = [];

    afficherPage("accueil");

    fermerMobileMenu();
}


/* =====================================================
   OUVRIR LES PROVINCES
===================================================== */

function ouvrirProvince() {

    // On réinitialise le type
    typeRecherche = "";

    afficherProvinces();

    afficherPage("provinces");

    fermerMobileMenu();
}


/* =====================================================
   OUVRIR LES PROVINCES POUR UN TYPE
   Utilisé si on choisit directement Hôpitaux
   ou Pharmacies depuis l'accueil
===================================================== */

function ouvrirProvincePourType(type) {

    typeRecherche = type;

    afficherProvinces();

    afficherPage("provinces");

    fermerMobileMenu();
}


/* =====================================================
   AFFICHER LES PROVINCES
===================================================== */

function afficherProvinces() {

    const container = document.getElementById("listeProvinces");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    provinces.forEach((province, index) => {

        const data = etablissements[province];

        const nombreHopitaux =
            data?.hopitaux?.length || 0;

        const nombrePharmacies =
            data?.pharmacies?.length || 0;

        const button =
            document.createElement("button");

        button.className = "province-card";

        button.dataset.province = province;

        button.type = "button";

        button.onclick = () => {
            selectionnerProvince(province);
        };

       const blason =
    blasonsProvinces[province] || "";

button.innerHTML = `

    <div class="province-number">
        ${String(index + 1).padStart(2, "0")}
    </div>

    <div class="province-card-content">

        <div class="province-blason-wrapper">

            ${
                blason
                ?
                `<img
                    src="${blason}"
                    alt="Blason de ${province}"
                    class="province-blason"
                >`
                :
                ""
            }

        </div>

        <div>

            <h3>
                ${province}
            </h3>

            <p>
${nombreHopitaux} ${nombreHopitaux > 1 ? "hôpitaux" : "hôpital"}                ·
${nombrePharmacies} ${nombrePharmacies > 1 ? "pharmacies" : "pharmacie"}            </p>

        </div>

    </div>

`;

        container.appendChild(button);
    });
}


/* =====================================================
   FILTRER LES PROVINCES
===================================================== */

function filtrerProvinces() {

    const input =
        document.getElementById("rechercheProvince");

    if (!input) {
        return;
    }

    const recherche =
        input.value
            .toLowerCase()
            .trim();

    document
        .querySelectorAll(".province-card")
        .forEach(card => {

            const province =
                card.dataset.province
                    .toLowerCase();

            card.style.display =
                province.includes(recherche)
                    ? "flex"
                    : "none";
        });
}


/* =====================================================
   SÉLECTIONNER UNE PROVINCE
===================================================== */

function selectionnerProvince(province) {

    provinceActive = province;

    const nomProvince =
        document.getElementById("nomProvince");

    if (nomProvince) {

        const blason =
            blasonsProvinces[province];

        nomProvince.innerHTML = `

            <span class="province-title">

                ${
                    blason
                    ?
                    `<img
                        src="${blason}"
                        alt="Blason de ${province}"
                        class="province-blason"
                    >`
                    :
                    ""
                }

                <span>
                    ${province}
                </span>

            </span>

        `;
    }

    afficherPage("services");

    fermerMobileMenu();
}


/* =====================================================
   RETOUR AUX PROVINCES
===================================================== */

function retourProvince() {

    // On quitte la recherche actuelle
    typeRecherche = "";
    donneesActuelles = [];

    // Réinitialiser la recherche
    const recherche =
        document.getElementById(
            "rechercheProvince"
        );

    if (recherche) {
        recherche.value = "";
    }

    afficherProvinces();

    afficherPage("provinces");
}

/* =====================================================
   BLASONS DES PROVINCES
===================================================== */

const blasonsProvinces = {

    "Estuaire":
        "assets/blasons/estuaire.png",

    "Haut-Ogooué":
        "assets/blasons/Haut-Ogooué.jpg",

    "Moyen-Ogooué":
        "assets/blasons/Moyen-Ogooué.jpg",

    "Ngounié":
        "assets/blasons/N’Gounié.jpg",

    "Nyanga":
        "assets/blasons/Nyanga.jpg",

    "Ogooué-Ivindo":
        "assets/blasons/Ogooué-Ivindo.png",

    "Ogooué-Lolo":
        "assets/blasons/Ogooué-Lolo.jpg",

    "Ogooué-Maritime":
        "assets/blasons/Ogooué Maritime.jpg",

    "Woleu-Ntem":
        "assets/blasons/Woleu-N’Tem.jpg"

};


/* =====================================================
   RETOUR AUX SERVICES
===================================================== */

function retourServices() {

    // Ne pas supprimer provinceActive !
    // Elle est nécessaire pour afficher
    // la bonne province.

    typeRecherche = "";
    donneesActuelles = [];

    if (provinceActive) {

    const nomProvince =
        document.getElementById("nomProvince");

    if (nomProvince) {

        const blason =
            blasonsProvinces[provinceActive];

        nomProvince.innerHTML = `

            <span class="province-title">

                <img
                    src="${blason}"
                    alt="Blason de ${provinceActive}"
                    class="province-blason"
                >

                <span>
                    ${provinceActive}
                </span>

            </span>

        `;
    }
}
    // Réinitialiser la recherche d'établissement
    const recherche =
        document.getElementById(
            "rechercheEtablissement"
        );

    if (recherche) {
        recherche.value = "";
    }

    afficherPage("services");
}


/* =====================================================
   AFFICHER HÔPITAUX
===================================================== */

function afficherHopitaux() {

    if (!provinceActive) {
        afficherPage("provinces");
        return;
    }

    afficherListe("hopitaux");
}


/* =====================================================
   AFFICHER PHARMACIES
===================================================== */

function afficherPharmacies() {

    if (!provinceActive) {
        afficherPage("provinces");
        return;
    }

    afficherListe("pharmacies");
}


/* =====================================================
   AFFICHER UNE LISTE
===================================================== */

function afficherListe(type) {

    if (!provinceActive) {

        afficherPage("provinces");

        return;
    }

    typeRecherche = type;

    const liste =
        document.getElementById("liste");

    const rechercheInput =
        document.getElementById(
            "rechercheEtablissement"
        );

    const titre =
        document.getElementById("titre");

    const badge =
        document.getElementById("resultatBadge");

    const description =
        document.getElementById(
            "descriptionResultats"
        );


    if (!liste) {
        return;
    }


    // Nettoyer la liste
    liste.innerHTML = "";


    // Réinitialiser la recherche
    if (rechercheInput) {
        rechercheInput.value = "";
    }


    /* ---------------------------------------------
       HÔPITAUX
    --------------------------------------------- */

    if (type === "hopitaux") {

        if (titre) {
            titre.textContent =
                "Hôpitaux CNAMGS";
        }

        if (badge) {
            badge.textContent =
                "🏥 Structures hospitalières";
        }

        if (description) {
            description.textContent =
                "Retrouvez les structures hospitalières disponibles dans cette province.";
        }
    }


    /* ---------------------------------------------
       PHARMACIES
    --------------------------------------------- */

    if (type === "pharmacies") {

        if (titre) {
            titre.textContent =
                "Pharmacies CNAMGS";
        }

        if (badge) {
            badge.textContent =
                "💊 Pharmacies";
        }

        if (description) {
            description.textContent =
                "Retrouvez les pharmacies disponibles dans cette province.";
        }
    }


    /* ---------------------------------------------
       RÉCUPÉRER LES DONNÉES
    --------------------------------------------- */

    donneesActuelles =
        etablissements[provinceActive]?.[type] || [];


    /* ---------------------------------------------
       AFFICHER LES CARTES
    --------------------------------------------- */

    afficherCartes(
        donneesActuelles,
        type
    );


    /* ---------------------------------------------
       AFFICHER LA PAGE RÉSULTATS
    --------------------------------------------- */

    afficherPage("resultats");
}


/* =====================================================
   AFFICHER LES CARTES
===================================================== */

function afficherCartes(data, type) {

    const liste =
        document.getElementById("liste");

    if (!liste) {
        return;
    }

    liste.innerHTML = "";


    /* ---------------------------------------------
       AUCUNE DONNÉE
    --------------------------------------------- */

    if (!data || data.length === 0) {

        liste.innerHTML = `

            <div class="establishment-card">

                <div class="establishment-top">

                    <div class="establishment-icon">
                        ℹ️
                    </div>

                    <div>

                        <h3>
                            Aucun établissement
                        </h3>

                        <p>
                            Aucune donnée n'est actuellement
                            disponible pour cette province.
                        </p>

                    </div>

                </div>

            </div>

        `;

        return;
    }


    /* ---------------------------------------------
       CRÉER LES CARTES
    --------------------------------------------- */

    data.forEach(etablissement => {

        const card =
            document.createElement("article");

        card.className =
            "establishment-card";


        const icone =
            type === "hopitaux"
                ? "🏥"
                : "💊";


        /* -----------------------------------------
           TÉLÉPHONE
        ----------------------------------------- */

        let telephoneHTML = "";

        if (etablissement.tel) {

            telephoneHTML = `

                <div class="info-row">

                    <span>
                        ☎️
                    </span>

                    <span>
                        <strong>
                            ${etablissement.tel}
                        </strong>
                    </span>

                </div>

            `;
        }


        /* -----------------------------------------
           GOOGLE MAPS
        ----------------------------------------- */

        let carteURL = "#";


        if (
            etablissement.latitude &&
            etablissement.longitude
        ) {

            carteURL =
                `https://www.google.com/maps/search/?api=1&query=${etablissement.latitude},${etablissement.longitude}`;

        } else {

            const rechercheCarte =
                encodeURIComponent(
                    `${etablissement.nom}, ${etablissement.ville}, Gabon`
                );

            carteURL =
                `https://www.google.com/maps/search/?api=1&query=${rechercheCarte}`;
        }


        /* -----------------------------------------
           CARTE HTML
        ----------------------------------------- */

        card.innerHTML = `

            <div class="establishment-top">

                <div class="establishment-icon">
                    ${icone}
                </div>

                <div>

                    <h3>
                        ${etablissement.nom}
                    </h3>

                    <span class="establishment-type">

                        ${
                            type === "hopitaux"
                                ? "STRUCTURE HOSPITALIÈRE"
                                : "PHARMACIE"
                        }

                    </span>

                </div>

            </div>


            <div class="establishment-info">

                <div class="info-row">

                    <span>
                        📍
                    </span>

                    <span>

                        <strong>
                            ${etablissement.ville}
                        </strong>

                        <br>

                        ${etablissement.adresse}

                    </span>

                </div>


                ${telephoneHTML}

            </div>


            <div class="establishment-actions">

                ${
                    etablissement.tel

                    ?

                    `
                    <a
                        class="action-button call-button"
                        href="tel:${etablissement.tel}"
                    >
                        ☎️ Appeler
                    </a>
                    `

                    :

                    `
                    <span
                        class="action-button call-button"
                        style="opacity:0.5"
                    >
                        ☎️ Non disponible
                    </span>
                    `
                }


                <a
                    class="action-button map-button"
                    href="${carteURL}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📍 Itinéraire
                </a>

            </div>

        `;


        liste.appendChild(card);

    });
}


/* =====================================================
   RECHERCHE D'UN ÉTABLISSEMENT
===================================================== */

function filtrerEtablissements() {

    const input =
        document.getElementById(
            "rechercheEtablissement"
        );

    if (!input) {
        return;
    }

    const recherche =
        input.value
            .toLowerCase()
            .trim();


    const resultats =
        donneesActuelles.filter(
            etablissement => {

                return (

                    etablissement.nom
                        .toLowerCase()
                        .includes(recherche)

                    ||

                    etablissement.ville
                        .toLowerCase()
                        .includes(recherche)

                    ||

                    etablissement.adresse
                        .toLowerCase()
                        .includes(recherche)

                );
            }
        );


    afficherCartes(
        resultats,
        typeRecherche
    );
}


/* =====================================================
   À PROPOS
===================================================== */

function afficherAPropos() {

    afficherPage("apropos");

    fermerMobileMenu();
}


/* =====================================================
   MENU MOBILE
===================================================== */

function toggleMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    if (!menu) {
        return;
    }

    menu.classList.toggle("show");
}


function fermerMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    if (!menu) {
        return;
    }

    menu.classList.remove("show");
}


/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        afficherProvinces();

        // Toujours démarrer sur l'accueil
        afficherPage("accueil");

    }
);