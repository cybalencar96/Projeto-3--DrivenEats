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
        const sendButton = document.getElementById("sendButton");
    
        sendButton.style.backgroundColor = "#32B72F";
        sendButton.innerHTML = "Fechar pedido"
        
        sendButton.setAttribute("onclick", "openConfirmWindow()")
    }

}

function openConfirmWindow() {
    const orderItens = document.getElementsByClassName("confirm-order-item");

    orderItens[0].children[0].innerHTML = myPlate.plateName;
    orderItens[0].children[1].innerHTML = myPlate.plateCost.toFixed(2);


    orderItens[1].children[0].innerHTML = myDrink.drinkName;
    orderItens[1].children[1].innerHTML = myDrink.drinkCost.toFixed(2);

    orderItens[2].children[0].innerHTML = myDessert.dessertName;
    orderItens[2].children[1].innerHTML = myDessert.dessertCost.toFixed(2);

    const finalCost = myPlate.plateCost + myDrink.drinkCost + myDessert.dessertCost;

    orderItens[3].children[1].innerHTML = finalCost.toFixed(2);

    const confirmWindow = document.getElementById("confirmWindow");
    confirmWindow.style.display = "flex";
}

function confirmOrder() {
    const customerName = prompt("Digite seu nome");
    const customerAddress = prompt("Digite o endereço de entrega. (Rua Exemplo, nº 00, complement, bairro)");
    
    const finalCost = myPlate.plateCost + myDrink.drinkCost + myDessert.dessertCost;
    const strMessage = "Olá, gostaria de fazer o pedido \n - Prato: " + myPlate.plateName + "\n - Bebida: " + myDrink.drinkName + "\n - Sobremesa: " + myDessert.dessertName + "\n Total: R$ " + finalCost.toFixed(2) + "\n \n Nome: " + customerName + "\n Endereço: " + customerAddress;
    const URIencodeMessage = encodeURIComponent(strMessage);
    const wppStr = "https://wa.me/5521967670121?text=" + URIencodeMessage;

    window.open(wppStr);

    const confirmWindow = document.getElementById("confirmWindow");
    confirmWindow.style.display = "none";
}

function cancelOrder() {
    const confirmWindow = document.getElementById("confirmWindow");
    confirmWindow.style.display = "none";
}
