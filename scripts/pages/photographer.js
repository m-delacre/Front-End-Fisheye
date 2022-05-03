//Mettre le code JavaScript lié à la page photographer.html
var urlSearchParams = URL.searchParams;
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

async function getPhotographers() {
    let photographers = [];
    await fetch('./data/photographers.json')
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

async function getPhotographe() {
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

    nom.innerHTML = photographe.name;
    photoProfil.setAttribute("src", `assets/images/photographers ID Photos/${photographe.portrait}`);
    localisation.innerHTML = `${photographe.city}, ${photographe.country}`;
    slogan.innerHTML = photographe.tagline;
    prix.innerHTML = `${photographe.price}€/jour`;
};

getPhotographe();
/*
const a = getPhotographers();
const photographe = a.photographers.find(photographer => photographer.id === id);
console.log(photographe);
*/