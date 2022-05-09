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

async function getMedias() {
    let medias = [];
    await fetch('./data/photographers.json')
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
    photoProfil.setAttribute("src", `assets/images/photographers ID Photos/${photographe.portrait}`);
    localisation.innerHTML = `${photographe.city}, ${photographe.country}`;
    slogan.innerHTML = photographe.tagline;
    prix.innerHTML = `${photographe.price}€/jour`;
};

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

async function init() {
    getPhotographers();
    findPhotographe();
    const { media } = await getMedias();
    displayMedia(media);
};

//lightbox
async function mediaDuPhotographe() {
    const { media } = await getMedias();
    let mesMedias = [];
    media.forEach((media) => {
        if(media.photographerId == id){
            mesMedias.push(`./assets/images/${media.photographerId}/${media.image}`)
            let listeImg = document.getElementById('slider');
            let image = document.createElement('img');
            image.setAttribute('src',`./assets/images/${media.photographerId}/${media.image}`)
            image.setAttribute('class','img')
            listeImg.appendChild(image);
            console.log(media);
        }
    });
    return mesMedias;
};

const items = document.getElementsByClassName('img');
const nbSlide = items.length;
const suivant = document.querySelector('.right');
const precedent = document.querySelector('.left');
let count = 0;

function slideSuivante(){
    items[count].classList.remove('active');

    if(count < nbSlide - 1){
        count++;
    } else {
        count = 0;
    }

    items[count].classList.add('active')
    console.log(count);
    
}
suivant.addEventListener('click', slideSuivante)


function slidePrecedente(){
    items[count].classList.remove('active');

    if(count > 0){
        count--;
    } else {
        count = nbSlide - 1;
    }

    items[count].classList.add('active')
    // console.log(count);
    
}
precedent.addEventListener('click', slidePrecedente)

function keyPress(e){
    console.log(e);
    
    if(e.keyCode === 37){
        slidePrecedente();
    } else if(e.keyCode === 39){
        slideSuivante();
    }
}
document.addEventListener('keydown', keyPress)
/*
// Global var
const prevBtn = document.getElementsByClassName('.prev-image')
const nextBtn = document.getElementsByClassName('.next-image')
const carouselItems = document.getElementsByClassName('.carousel-item')

let currentItemPosition = 0
let carouselInterval
 
// Funcs
const goToNextSlide = () => {
   if (currentItemPosition + 1 >=  carouselItems.length) {
      
       const lastItem = `.item-${currentItemPosition}`
 
       currentItemPosition = 0
       const currentItem = `.item-${currentItemPosition}`
      
       setNodeAttributes(lastItem, currentItem)
   } else {
       currentItemPosition += 1
       const lastItem = `.item-${currentItemPosition - 1}`
       const currentItem = `.item-${currentItemPosition}`
      
       setNodeAttributes(lastItem, currentItem)
   }
}
 
const goToPreviousSlide = () => {
   if (currentItemPosition - 1 >=  0) {
       currentItemPosition -= 1
       const currentItem = `.item-${currentItemPosition}`
       const lastItem = `.item-${currentItemPosition + 1}`
 
       setNodeAttributes(lastItem, currentItem)
   } else {
       const lastItem = `.item-${currentItemPosition}`
      
       currentItemPosition = 2
       const currentItem = `.item-${currentItemPosition}`
      
       setNodeAttributes(lastItem, currentItem)
   }
}
 
 
const setNodeAttributes = (lastItem, currentItem) => {
   lastItem.style.display = "none"
   currentItem.style.display = "block"
   lastItem.setAttribute('aria-hidden', 'true')
   currentItem.setAttribute('aria-hidden', 'false');
}
 
 
// Events
prevBtn.addEventListener('click', function() {
    goToPreviousSlide()
});

nextBtn.addEventListener('click', function() {
    goToNextSlide()
});
 
document.keydown(function(e) {
   const keyCode = e.keyCode ? e.keyCode : e.which
 
   if (keyCode === 39) {
       goToNextSlide()
   } else if (keyCode === 37) {
       goToPreviousSlide()
   }
})
*/
init();
