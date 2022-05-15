function closeLightBox(){
    let croix = document.getElementById('lightbox_fermer');
    croix.addEventListener('click', ()=>{
        document.getElementById('lightbox').style.display = "none";
    });
}

function getListeMedias(medias){
    let listeMedias = [];
    medias.forEach((media) => {
        if(media.photographerId == id){
            const mediaModel = mediaFactory(media);
            if(mediaModel.video == undefined){
                listeMedias.push(mediaModel.picture);
                console.log(mediaModel.picture);
            }else{
                listeMedias.push(mediaModel.movie);
                console.log(mediaModel.movie);
            }
        }
    });
    return listeMedias;
}

function openLightBox(media){
    document.querySelector('div.LightBox').style.display = "flex";
    let source;
    if(media.image == undefined){
        source = document.querySelector('div.LightBox > div.lightbox_media > video');
        source.setAttribute('src',movie);
        source.setAttribute('src',title);
    }else{
        source = document.querySelector('div.LightBox > div.lightbox_media > img');
        source.setAttribute('src',picture);
        source.setAttribute('src',title);
    }
    let titre = document.querySelector('div.lightbox > div.lightbox_media > div.lightbox_txt');
    titre.innerHTML = title;
}

function nextMedia(){

}

function previousMedia(){

}