function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price} = data;

    const picture = `assets/images/${photographerId}/${image}`;

    function getMediaCardDOM() {
        //créer une card
        const article = document.createElement( 'article' );
        article.setAttribute('class','mediaCard');

        //la partie photo
        const photo = document.createElement('div');
        photo.setAttribute('class','mediaCard--img');
        /*si photo ou si vidéo
        const monType = data.image;
        let type = monType.slice(monType.length - 4);
        if(type == '.jpg'){
            //la photo
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            img.setAttribute("alt", `${title}`);
            photo.appendChild(img);
        } else if(type == '.mp4'){
            console.log('il y a une vidéo');
        }
        */
        //la photo
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${title}`);
        photo.appendChild(img); 


        //partie info
        const info = document.createElement('div');
        info.setAttribute('class','mediaCard--info');
        //le nom de la photo
        const titrePhoto = document.createElement( 'h3' );
        titrePhoto.textContent = title;
        titrePhoto.setAttribute('class','mediaCard--info--titre');
        //le like
        const like = document.createElement( 'div' );
        like.setAttribute('class','mediaCard--info--like');
        const nombreLike = document.createElement( 'p' );
        nombreLike.textContent = `${likes}`;
        const coeur = document.createElement('i');
        coeur.setAttribute("class",'fa-solid fa-heart heartLike');
        coeur.setAttribute("aria-label",'likes');
        like.appendChild(nombreLike);
        like.appendChild(coeur);
        info.appendChild(titrePhoto);
        info.appendChild(like);
        
        //link les deux partie
        article.appendChild(photo);
        article.appendChild(info);
        return (article);
    }
    return { id, photographerId, title, picture, likes, getMediaCardDOM }
}