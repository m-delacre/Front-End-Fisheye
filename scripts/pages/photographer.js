//Mettre le code JavaScript lié à la page photographer.html
var urlSearchParams = URL.searchParams;
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
let totalLike = 0;

async function getPhotographers() {
    let photographers = [];
    await fetch('data/photographers.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(value) {
        photographers = value.photographers;
    })
    .catch(function(error){
        console.log(error);
    });
    return ({photographers: [...photographers]})
}

async function getMedias() {
    let medias = [];
    await fetch('data/photographers.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(value) {
        medias = value.media;
    })
    .catch(function(error){
        console.log(error);
    });
    return ({media: [...medias]})
}

//définir le photographe qui est sélectionné 
async function findPhotographe() {
    // Récupère les datas des photographes
    const listePhotographes = await getPhotographers();
    const photographe = listePhotographes.photographers.find(photographers => photographers.id == id);
    let photoProfil = document.getElementById('photoProfil');
    let nom = document.getElementById('photographeName');
    let localisation = document.getElementById("photographeLocalisation");
    let slogan = document.getElementById("photographeSlogan");
    let prix = document.getElementById('pricetag');
    let nomModal = document.getElementById('contact_name');
    nomModal.innerHTML = photographe.name;

    //assigner les datas au bon endroit
    nom.innerHTML = photographe.name;
    photoProfil.setAttribute("src", `assets/images/Photographers ID Photos/${photographe.portrait}`);
    photoProfil.setAttribute("alt",`${photographe.name}`);
    localisation.innerHTML = `${photographe.city}, ${photographe.country}`;
    slogan.innerHTML = photographe.tagline;
    prix.innerHTML = `${photographe.price}€/jour`;
};

//afficher les médias du photographe
async function displayMedia(medias) {
    const mediaSection = document.getElementById("media_section");
    medias.forEach((media) => {
        if(media.photographerId == id){
            const mediaModel = mediaFactory(media);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            mediaSection.appendChild(mediaCardDOM);
        }
    });
};

//récup les likes total de bases
async function getTotalLike() {
    const { media } = await getMedias();
    document.getElementById('totalLike').innerHTML = totalLike;
    totalLike = 0;
    media.forEach((media) => {
        if(media.photographerId == id){
            totalLike += media.likes;
        }
    });
    document.getElementById('totalLike').innerHTML = totalLike;
};

//trier par titre 
async function mediaSortByTitle(){
    const { media } = await getMedias();
    media.sort(function(a, b) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    document.getElementById("media_section").innerHTML = "";
    displayMedia(media);
    getTotalLike();
}

//trier par date
async function mediaSortByDate(){
    const { media } = await getMedias();
    media.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    document.getElementById("media_section").innerHTML = "";
    displayMedia(media);
    getTotalLike();
}

//trier par popularité
async function mediaSortByLikes(){
    const { media } = await getMedias();
    media.sort(function(a,b){
        return b.likes - a.likes;
    });
    document.getElementById("media_section").innerHTML = "";
    displayMedia(media);
    getTotalLike();
}

async function init() {
    getPhotographers();
    findPhotographe();
    const { media } = await getMedias();
    displayMedia(media);
    getTotalLike();
};

init();