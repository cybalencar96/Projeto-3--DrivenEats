let plateSelected,drinkSelected,dessertSelected = false;


// Creating global objects
function plate (plateName,plateCost) {
    this.plateName = plateName;
    this.plateCost = plateCost;
}
let myPlate = new plate;
function drink (drinkName,drinkCost) {
    this.drinkName = drinkName;
    this.drinkCost = drinkCost;
}
let myDrink = new drink;
function dessert (dessertName,dessertCost) {
    this.dessertName = dessertName;
    this.dessertCost = dessertCost;
}
let myDessert = new dessert;

function selectPlate(num,plateName, plateCost) {
    const plates = document.getElementsByClassName("plates");


    // Unchecking all plates
    for (i = 0; i < plates.length; i++){
        plates[i].classList.remove("choosen");
        plates[i].children[4].style.display = "none";
    }

    // Checking one plate
    plates[num].classList.add("choosen");
    plates[num].children[4].style.display = "inherit";

    plateSelected = true;
    myPlate.plateName = plateName;
    myPlate.plateCost = plateCost;

    enableSendButton();
}

function selectDrink(num, drinkName,drinkCost) {
    const drinks = document.getElementsByClassName("drinks");
    // Unchecking all drinks
    for (i = 0; i < drinks.length; i++){
        drinks[i].classList.remove("choosen");
        drinks[i].children[4].style.display = "none";
    }

    // Checking one plate
    drinks[num].classList.add("choosen");
    drinks[num].children[4].style.display = "inherit"

    drinkSelected = true;
    myDrink.drinkName = drinkName;
    myDrink.drinkCost = drinkCost;

    enableSendButton();
    
}

function selectDessert(num,dessertName,dessertCost) {
    const desserts = document.getElementsByClassName("desserts");
    // Unchecking all desserts
    for (i = 0; i < desserts.length; i++){
        desserts[i].classList.remove("choosen");
        desserts[i].children[4].style.display = "none"
    }

    // Checking one plate
    desserts[num].classList.add("choosen");
    desserts[num].children[4].style.display = "inherit"
 
    dessertSelected = true;
    myDessert.dessertName = dessertName;
    myDessert.dessertCost = dessertCost;

    enableSendButton();
}

function enableSendButton() {

    if (plateSelected && drinkSelected && dessertSelected) {
        const sendButton = document.getElementsByTagName("button");
    
        sendButton[0].style.backgroundColor = "#32B72F";
        sendButton[0].innerHTML = "Fechar pedido"
        
        sendButton[0].setAttribute("onclick", "sendOrder()")
    }

}

function sendOrder() {
    const finalCost = myPlate.plateCost + myDrink.drinkCost + myDessert.dessertCost;
    const strMessage = "Olá, gostaria de fazer o pedido \n - Prato: " + myPlate.plateName + "\n - Bebida: " + myDrink.drinkName + "\n - Sobremesa: " + myDessert.dessertName + "\n Total: R$ " + finalCost.toFixed(2);    console.log(strMessage);
    const URIencode = encodeURIComponent(strMessage);
    const wppStr = "https://wa.me/5521967670121?text=" + URIencode;

    window.open(wppStr);
}
