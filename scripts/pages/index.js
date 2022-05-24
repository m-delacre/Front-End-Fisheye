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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
init();