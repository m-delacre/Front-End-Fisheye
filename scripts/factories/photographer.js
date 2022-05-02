function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/images/photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        //créer un profil
        const article = document.createElement( 'article' );
        //la photo de profil
        const lien = document.createElement('a');
        lien.setAttribute("href", `http://localhost:3000/photographer?id=${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `photo de ${name}`);
        lien.appendChild(img);
        //le nom
        const nom = document.createElement( 'h2' );
        nom.textContent = name;
        //la localisation
        const localisation = document.createElement( 'h3' );
        localisation.textContent = `${city}, ${country}`;
        //le slogan
        const slogan = document.createElement( 'h4' );
        slogan.textContent = tagline;
        //prix/heure
        const prix = document.createElement( 'h5' );
        prix.textContent = `${price}€/jour`;
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