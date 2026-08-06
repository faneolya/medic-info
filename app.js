let provinceActive = "";


// Gestion des pages
function afficherPage(id){

    document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

    document.getElementById(id)
    .classList.add("active");

}



// Aller vers provinces
function ouvrirProvince(){

    afficherPage("provinces");

}




// Sélection d'une province
function selectionProvince(){

    provinceActive =
    document.getElementById("choixProvince").value;


    if(provinceActive !== ""){

        document.getElementById("nomProvince")
        .innerHTML = "🇬🇦 " + provinceActive;


        afficherPage("services");

    }

}





// Afficher les hôpitaux
function afficherHopitaux(){

    afficherListe("hopitaux");

}




// Afficher les pharmacies
function afficherPharmacies(){

    afficherListe("pharmacies");

}





// Affichage des résultats
function afficherListe(type){


    let liste = document.getElementById("liste");


    liste.innerHTML = "";



    document.getElementById("titre")
    .innerHTML =
    type === "hopitaux"
    ?
    "🏥 Hôpitaux CNAMGS"
    :
    "💊 Pharmacies CNAMGS";



    let data =
    etablissements[provinceActive]?.[type] || [];



    if(data.length === 0){

        liste.innerHTML =
        `
        <div class="card">
        <p>Aucun établissement enregistré pour cette province.</p>
        </div>
        `;

    }



    data.forEach(e=>{


        let div = document.createElement("div");


        div.className = "card";



        div.innerHTML = `

        <h3>${e.nom}</h3>

        📍 Ville : ${e.ville}<br>

        Adresse : ${e.adresse}<br>


        ${
        e.tel

        ?

        `
        ☎️ <span class="telephone">
        ${e.tel}
        </span>

        <br>

        <a href="tel:${e.tel}">
        <button>
        📞 Appeler
        </button>
        </a>

        `

        :

        ""
        }

        `;


        liste.appendChild(div);


    });



    afficherPage("resultats");


}





// ====== BOUTONS RETOUR ======


// Retour vers l'accueil
function retourAccueil(){

    afficherPage("accueil");

}



// Retour vers le choix de province
function retourProvince(){

    afficherPage("provinces");

}



// Retour vers les services
function retourServices(){

    afficherPage("services");

}