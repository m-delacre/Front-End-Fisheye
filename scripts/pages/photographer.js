//Mettre le code JavaScript lié à la page photographer.html
var urlSearchParams = URL.searchParams;
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

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
    console.log(listePhotographes)
    const photographe = listePhotographes.photographers.find(photographers => photographers.id == id);
    console.log(photographe);
    console.log(photographe.name);
};

getPhotographe();
/*
const a = getPhotographers();
const photographe = a.photographers.find(photographer => photographer.id === id);
console.log(photographe);
*/