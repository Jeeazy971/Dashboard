
function changerDashboard(value)
{
    Array.from(document.getElementsByClassName("dashboard")).forEach(element => {
        element.style.display="none";
    }); 
    document.getElementById(value).style.display="flex"; 
}


function afficher(bouton){
    let divContenu = bouton.parentElement;
    let listeApplication = bouton.parentElement.children[1];
    
    if(listeApplication.style.display == "none"){
        listeApplication.style.display = "block";
        if (divContenu.children[2])
            divContenu.children[2].remove();

    }else{
        listeApplication.style.display = "none";
    } 
    
}

// La taille des widgets

let tailleWdgets = document.querySelector("#dashboard");
    tailleWdgets.addEventListener("change", function() {
        console.log(tailleWdgets.options[tailleWdgets.selectedIndex].innerHTML);
    });


// On sélectionne les widgets

let liste = document.querySelector(".liste");
    liste.addEventListener("change", function() {
        console.log(liste.options[liste.selectedIndex].innerHTML);
    });


function listeApplication(rouage)
{
    let widget = rouage.parentElement;
    if(rouage.parentElement.children[2]!=null) { 
        // si il y a un autre element (le 3èeme) dans ma div 
        rouage.parentElement.children[2].remove();    //je remove() l'element 3 du widget
      
        if(localStorage.getItem(widget.id)!=null){
            localStorage.removeItem(widget.id);
        }
    } 
    
    var selectionBoutton = rouage.parentElement.children[1];  // Je récupere la sélection de boutton
    if (selectionBoutton.style.display=="flex")
        selectionBoutton.style.display="none";
    else
        selectionBoutton.style.display="flex";
}

function valeursApplication(valider)
{
    var widget = valider.parentElement.parentElement;
    var selectionBoutton =valider.parentElement;
    var valeurSelectionApp=selectionBoutton.children[0].value;
    // ICi je masque le div selectionBoutton des que j'ai sélectionné l'application

    selectionBoutton.style.display="none";
    switch (valeurSelectionApp)
    {
        case "Calculatrice":
            createCalculatrice(widget);
            break;
        case "bienvenue":
            createBienvenue(widget);
            break;
        case "colorChooser":
            createCouleur(widget);
            break;
    }
}

//  Partie d'intégration des widgets

function createCalculatrice(Widget)
{
    Widget.innerHTML +=     
    `
    <div id="container">
        <h1>Calculatrice</h1>

        <input class"effacer" type="text" name="text" value ="" id="resultat" disabled>
        <div id="touches">
            
            <button class="BouttonCalculatrice" value="7" onclick="toucheCalculette(this)">7</button>
            <button class="BouttonCalculatrice" value="8" onclick="toucheCalculette(this)">8</button>
            <button class="BouttonCalculatrice" value="9" onclick="toucheCalculette(this)">9</button>
            <button class="BouttonCalculatrice" value="/" onclick="toucheCalculette(this)">/</button>
            <button class="BouttonCalculatrice" value="4" onclick="toucheCalculette(this)">4</button>
            <button class="BouttonCalculatrice" value="5" onclick="toucheCalculette(this)">5</button>
            <button class="BouttonCalculatrice" value="6" onclick="toucheCalculette(this)">6</button>
            <button class="BouttonCalculatrice" value="*" onclick="toucheCalculette(this)">*</button>
            <button class="BouttonCalculatrice" value="1" onclick="toucheCalculette(this)">1</button>
            <button class="BouttonCalculatrice" value="2" onclick="toucheCalculette(this)">2</button>
            <button class="BouttonCalculatrice" value="3" onclick="toucheCalculette(this)">3</button>
            <button class="BouttonCalculatrice" value="-" onclick="toucheCalculette(this)">-</button>
            <button class="BouttonCalculatrice" value="C" onclick="toucheCalculette(this)">C</button>
            <button class="BouttonCalculatrice" value="0" onclick="toucheCalculette(this)">0</button>
            <button class="BouttonCalculatrice" value="=" onclick="toucheCalculette(this)">=</button>
            <button class="BouttonCalculatrice" value="+" onclick="toucheCalculette(this)">+</button>
            
        </div>

    </div>

    `;
}

function toucheCalculette(BouttonCalculatrice)
{
    inputCalcultrice = BouttonCalculatrice.parentElement.parentElement.children[1];

    if (BouttonCalculatrice.value=="="){
        resultatTotal = eval(inputCalcultrice.value);
        inputCalcultrice.value = resultatTotal;
        return;
    }
    
    inputCalcultrice = BouttonCalculatrice.parentElement.parentElement.children[1];
     
    inputCalcultrice.value += BouttonCalculatrice.value;

}

function createBienvenue(Widget)
{
    Widget.innerHTML +=`<div class="BienvenueApp">
        <p class="paragrapheBienvenue">Bienvenue sur le dashboard de Josué</p>
    </div>`;
}


function createCouleur(Widget)
{
    Widget.innerHTML +=
    `
    <div id="container">
        <div class="blocCouleur">
        </div>
        <div class="ligneInput">
            <label>0</label>
            <input type="range" min="0" max =255 value="0" onchange="changeCouleur(this,0)">
            <label>0</label>
            <input type="range" min="0" max =255 value="0" onchange="changeCouleur(this,2)">
            <label>0</label>
            <input type="range" min="0" max =255 value="0" onchange="changeCouleur(this,4)">
        </div>
    </div>
    `;
}

function changeCouleur(range,index)
{
    let blocCouleur = range.parentElement.parentElement.children[0];
    let labelAChange = range.parentElement.children[index];
    let rangeRouge= range.parentElement.children[1];
    let rangeVert = range.parentElement.children[3];
    let rangeBleue= range.parentElement.children[5];

    blocCouleur.style.background=`rgb(${rangeRouge.value} ${rangeVert.value} ${rangeBleue.value} )`;

    labelAChange.innerHTML= range.value;
}