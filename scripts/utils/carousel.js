let current  = 0;

function closeLightBox(){
    let croix = document.getElementById('lightbox_fermer');
    croix.addEventListener('click', ()=>{
        document.getElementById('LightBox').style.display = "none";
    });
    resetMedia();
    header.style.display = "flex";
	main.style.display = "block";
    header.setAttribute('aria-hidden','false');
	main.setAttribute('aria-hidden','false');
}

function getListeMedias(medias){
    let listeMedias = [];
    medias.forEach((media) => {
        if(media.photographerId == id){
            const mediaModel = mediaFactory(media);
            if(mediaModel.picture == undefined){
                listeMedias.push(mediaModel.movie);
            }
            else{
                listeMedias.push(mediaModel.picture);
            }
        }
    });
    return listeMedias;
}

function getListeTitres(medias){
    let listeTitres= [];
    medias.forEach((media) => {
        if(media.photographerId == id){
            const mediaModel = mediaFactory(media);
            if(mediaModel.picture == undefined){
                listeTitres.push(mediaModel.title);
            }
            else{
                listeTitres.push(mediaModel.title);
            }
        }
    });
    return listeTitres;
}

function openLightBox(media, title){
    document.getElementById('LightBox').style.display = "flex";
    setMedia(media, title);
    header.style.display = "none";
	main.style.display = "none";
    main.setAttribute('aria-hidden','true');
    header.setAttribute('aria-hidden','true');
}

async function setMedia(monMedia, title){
    let source;
    const { media } = await getMedias();
    let listeMedias = getListeMedias(media);
    let type = monMedia.substr(monMedia.length - 4)
    if(type ===".mp4"){
        source = document.querySelector('#LightBox > div.lightbox_media > video');
        source.setAttribute('src', monMedia);
        source.setAttribute('autoplay', 'true');
        source.setAttribute('loop', 'true');
        current = listeMedias.indexOf(monMedia);
        let a = document.querySelector('#LightBox > div.lightbox_media');
        let b = document.querySelector('#LightBox > div.lightbox_media > img');
        a.removeChild(b);
    }else if(type === ".jpg"){
        let a = document.querySelector('#LightBox > div.lightbox_media');
        if(!document.querySelector('#LightBox > div.lightbox_media > img')){
            let b = document.createElement('img');
            a.appendChild(b); 
        }
        source = document.querySelector('#LightBox > div.lightbox_media > img');
        source.setAttribute('src', monMedia);
        source.setAttribute('alt', title);
        current = listeMedias.indexOf(monMedia);
    }
    let titre = document.getElementById('lightbox_txt');
    titre.innerHTML = title;
}

async function nextMedia(){
    const { media } = await getMedias();
    let listeMedias = getListeMedias(media);
    let listeTitres = getListeTitres(media);
    await resetMedia()
    if(current + 1 > listeMedias.length-1){
        current = 0;
    }
    else{
        current ++;
    }
    await setMedia(listeMedias[current], listeTitres[current]);
}

async function previousMedia(){
    const { media } = await getMedias();
    let listeMedias = getListeMedias(media);
    let listeTitres = getListeTitres(media);
    await resetMedia()
    if(current - 1 < 0){
        current = listeMedias.length-1;
    }
    else{
        current --;
    }
    await setMedia(listeMedias[current], listeTitres[current]);
}

//reset le media, supprime le dernier choisi pour pas avoir de double affichage
async function resetMedia(){
    let sourceVideo = document.querySelector('#LightBox > div.lightbox_media > video');
    sourceVideo.setAttribute('src', '');
    sourceVideo.setAttribute('autoplay', 'true');
    sourceVideo.setAttribute('loop', 'true');

    if(document.querySelector('#LightBox > div.lightbox_media > img') == true){
        let sourceImage = document.querySelector('#LightBox > div.lightbox_media > img');
        sourceImage.setAttribute('src', '');
        sourceImage.setAttribute('alt', '');  
    }
    
}

//gestion du clavier pour next et previous media
document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 39) {
        nextMedia();
    } else if (e.keyCode === 37) {
        previousMedia();
    }
}