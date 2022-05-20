function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price} = data;

    const picture = `assets/images/${photographerId}/${image}`;
    const movie = `assets/images/${photographerId}/${video}`;

    function getMediaCardDOM() {
        //créer une card
        const article = document.createElement( 'article' );
        article.setAttribute('class','mediaCard');

        //la partie photo
        const photo = document.createElement('div');
        photo.setAttribute('class','mediaCard--img');
        //si photo ou si vidéo
        if(image == undefined){
            //faire une vidéo
            const vid = document.createElement('video');
            vid.setAttribute('src',movie);
            vid.setAttribute("aria-label","cliquez pour agrandir");
            //vid.setAttribute('poster', '');
            photo.appendChild(vid);
            photo.addEventListener('click', ()=>{
                openLightBox(this.movie, );
            });
        } else{
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            img.setAttribute("aria-label","cliquez pour agrandir");
            photo.appendChild(img);
            photo.addEventListener('click', ()=>{
                openLightBox(this.picture, this.title);
            });
        }

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
        let nombreLike = document.createElement( 'p' );
        nombreLike.textContent = `${likes}`;
        nombreLike.setAttribute("aria-label","likes");
        const coeur = document.createElement('i');
        coeur.setAttribute("class",'fa-solid fa-heart heartLike');
        coeur.setAttribute("aria-label",'likes');
        like.appendChild(nombreLike);
        like.appendChild(coeur);
        info.appendChild(titrePhoto);
        info.appendChild(like);
        like.addEventListener('click', ()=>{
            let nblike = parseInt(nombreLike.textContent, 10);
            if(nblike == likes){
                nombreLike.textContent = nblike + 1;
                document.getElementById('totalLike').textContent = parseInt(document.getElementById('totalLike').textContent,10)+1;
            }else{
                nombreLike.textContent = likes;
                document.getElementById('totalLike').textContent = parseInt(document.getElementById('totalLike').textContent,10)-1;
            }
        });
        
        //link les deux partie
        article.appendChild(photo);
        article.appendChild(info);
        return (article);
    }

    if(image == undefined){
        return { id, photographerId, title, movie, likes, getMediaCardDOM }
    } else{
        return { id, photographerId, title, picture, likes, getMediaCardDOM }
    }
}