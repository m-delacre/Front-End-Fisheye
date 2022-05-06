const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const trie = document.getElementById('section-trie');
const logo = document.getElementById('logo');

function displayModal() {
	logo.style.display = "none";
	main.style.display = "none";
  trie.style.display = "none";
	modal.style.display = "flex";
  //gestion de visibilité pour les lecteurs d'écrans
  modal.setAttribute('aria-hidden','false');
  logo.setAttribute('aria-hidden','true');
	main.setAttribute('aria-hidden','true');
  trie.setAttribute('aria-hidden','true');
}

function closeModal() {
	logo.style.display = "block";
	main.style.display = "block";
    trie.style.display = "block";
	modal.style.display = "none";
  //gestion de visibilité pour les lecteurs d'écrans
  modal.setAttribute('aria-hidden','true');
  logo.setAttribute('aria-hidden','false');
	main.setAttribute('aria-hidden','false');
  trie.setAttribute('aria-hidden','false');
}

//variables
let formulaire = document.getElementById('formulaire');
let email = document.getElementById('email');
let prenom = document.getElementById('prenom');
let nom = document.getElementById('nom');
let commentaire = document.getElementById('commentaire');
//variables regex
let nameRegex = /^[a-zA-Z-\s]+$/
let mailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/


//functions de vérifications

//verif prenom
function checkPrenom(){
  if(prenom.value.length < 2 || !prenom.value.match(nameRegex)){
    prenom.parentElement.setAttribute('data-error-visible', 'true');
    prenom.style.border = '2px solid #e54858';
    return false;
  }
  prenom.style.border = '0px';
  prenom.parentElement.setAttribute('data-error-visible', 'false');
  return  true;
}

//verif nom
function checkNom(){
  if(nom.value.length < 2 || !nom.value.match(nameRegex)){
    nom.parentElement.setAttribute('data-error-visible', 'true');
    nom.style.border = '2px solid #e54858';
    return false;
  }
  nom.style.border = '0px';
  nom.parentElement.setAttribute('data-error-visible', 'false');
  return  true;
}

//verif mail
function checkMail(){
  if(email.value.trim() === "" || !email.value.match(mailRegex)){
    email.parentElement.setAttribute('data-error-visible', 'true');
    email.style.border = '2px solid #e54858';
    return false;
  }
  email.style.border = '0px';
  email.parentElement.setAttribute('data-error-visible', 'false');
  return  true;
}

//valide si tout est bien renseigné 
function validationForm(){
  if(checkPrenom()===true && checkNom()===true && checkMail()===true){
    return true;
  }else if(checkPrenom()===false && checkNom()===false && checkMail()===false){
    checkPrenom()
    checkNom()
    checkMail()
  }
}

//affiche le message 'merci de votre inscription'
function envoieValider(){
  modal.style.display = "none";
}

//au clique sur envoyé
formulaire.addEventListener('submit', function (event) {
  event.preventDefault();

  if(validationForm()===true){
    closeModal();
    console.log(`Message = Nom: ${nom.value}, Prénom: ${prenom.value}, Adresse mail: ${email.value}, Commentaire: ${commentaire.value} `)
    formulaire.reset();
  }else{
    validationForm();
  }
});

