function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/images/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        //créer un profil
        const article = document.createElement( 'article' );
        //la photo de profil
        const lien = document.createElement('a');
        lien.setAttribute("href", `./photographer.html?id=${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `photo de ${name}`);
        lien.appendChild(img);
        //le nom
        const nom = document.createElement( 'h2' );
        nom.textContent = name;
        //la localisation
        const localisation = document.createElement( 'p' );
        localisation.textContent = `${city}, ${country}`;
        localisation.setAttribute("class","accueilLocalisation");
        //le slogan
        const slogan = document.createElement( 'p' );
        slogan.textContent = tagline;
        slogan.setAttribute("class","accueilSlogan");
        //prix/heure
        const prix = document.createElement( 'p' );
        prix.textContent = `${price}€/jour`;
        prix.setAttribute("class","accueilPrix");
        //link all
        article.appendChild(lien);
        article.appendChild(nom);
        article.appendChild(localisation);
        article.appendChild(slogan);
        article.appendChild(prix);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}