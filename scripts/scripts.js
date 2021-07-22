// Declaring last selected controllers || -1 means that no item was selected
let lastDessertSelected = -1;
let lastPlateSelected = -1;
let lastDrinkSelected = -1;


// Creating global objects
function plate (plateSelected,plateName,plateCost) {
    this.plateName = plateName;
    this.plateCost = plateCost;
    this.plateSelected = plateSelected;
}

let myPlate = new plate;

function drink (drinkSelected,drinkName,drinkCost) {
    this.drinkName = drinkName;
    this.drinkCost = drinkCost;
    this.drinkSelected = drinkSelected;

}

let myDrink = new drink;

function dessert (dessertSelected,dessertName,dessertCost) {
    this.dessertName = dessertName;
    this.dessertCost = dessertCost;
    this.plateSelected = dessertSelected;
}

let myDessert = new dessert;
// ----------------------------------------



function selectItem(itemId,itemName, itemCost) {
    const plates = document.getElementsByClassName("plates");
    const drinks = document.getElementsByClassName("drinks");
    const desserts = document.getElementsByClassName("desserts");

    // If item selected is a plate
    if (itemId[0] === "0") {

        if (Number(itemId[1]) === lastPlateSelected) {
            plates[lastPlateSelected].classList.remove("choosen");
            plates[lastPlateSelected].children[4].style.display = "none";
            lastPlateSelected = -1;
            myPlate.plateSelected = false;
            enableSendButton();
            return;
        }
        // unmark last plate selected -> -1 means that no drink was selected
        if (lastPlateSelected !== -1 ) {
            plates[lastPlateSelected].classList.remove("choosen");
            plates[lastPlateSelected].children[4].style.display = "none";
        }

        // mark new plate
        plates[Number(itemId[1])].classList.add("choosen");
        plates[Number(itemId[1])].children[4].style.display = "initial";

        // update last plate selected
        lastPlateSelected = Number(itemId[1]);

        // Save plate name and cost
        myPlate.plateName = itemName;
        myPlate.plateCost = itemCost;
        myPlate.plateSelected = true;

    }
    
    // If item selected is a drink
    if (itemId[0] === "1") {

        if (Number(itemId[1]) === lastDrinkSelected) {
            drinks[lastDrinkSelected].classList.remove("choosen");
            drinks[lastDrinkSelected].children[4].style.display = "none";
            lastDrinkSelected = -1;
            myDrink.drinkSelected = false;
            enableSendButton();
            return;
        }

        // unmark last drink selected || -1 means that no drink was selected
        if (lastDrinkSelected !== -1 ) {
            drinks[lastDrinkSelected].classList.remove("choosen");
            drinks[lastDrinkSelected].children[4].style.display = "none";
        }

        // mark new drink
        drinks[Number(itemId[1])].classList.add("choosen");
        drinks[Number(itemId[1])].children[4].style.display = "initial";

        // update last drink selected
        lastDrinkSelected = Number(itemId[1]);

        // Save Drink name and cost
        myDrink.drinkName = itemName;
        myDrink.drinkCost = itemCost;
        myDrink.drinkSelected = true;

    }
    
    // If item selected is a dessert
    if (itemId[0] === "2") {

        if (Number(itemId[1]) === lastDessertSelected) {
            desserts[lastDessertSelected].classList.remove("choosen");
            desserts[lastDessertSelected].children[4].style.display = "none";
            lastDessertSelected = -1;
            myDessert.dessertSelected = false;
            enableSendButton();
            return;
        }

        // unmark last item selected || -1 means that no drink was selected
        if (lastDessertSelected !== -1 ) {
            desserts[lastDessertSelected].classList.remove("choosen");
            desserts[lastDessertSelected].children[4].style.display = "none";
        }   

        // mark new drink
        desserts[Number(itemId[1])].classList.add("choosen");
        desserts[Number(itemId[1])].children[4].style.display = "initial";

        // update last drink selected
        lastDessertSelected = Number(itemId[1]);

        // Save dessert name and cost
        myDessert.dessertName = itemName;
        myDessert.dessertCost = itemCost;
        myDessert.dessertSelected = true;
    }
    

    enableSendButton();
}

function enableSendButton() {
    const sendButton = document.getElementById("sendButton");

    if (myPlate.plateSelected && myDrink.drinkSelected && myDessert.dessertSelected) {
        sendButton.style.backgroundColor = "#32B72F";
        sendButton.innerHTML = "Fechar pedido"
        
        sendButton.setAttribute("onclick", "openConfirmWindow()")
    } else {
        sendButton.style.backgroundColor = "#CBCBCB";
        sendButton.innerHTML = "Selecione os 3 itens para fechar o pedido";

        sendButton.removeAttribute("onclick");
    }

}

function openConfirmWindow() {
    const orderItens = document.getElementsByClassName("confirm-order-item");

    // Writing plate infos on confirm window
    orderItens[0].children[0].innerHTML = myPlate.plateName;
    orderItens[0].children[1].innerHTML = myPlate.plateCost.toFixed(2);

    // Writing drink infos on confirm window
    orderItens[1].children[0].innerHTML = myDrink.drinkName;
    orderItens[1].children[1].innerHTML = myDrink.drinkCost.toFixed(2);

    // Writing dessert infos on confirm window
    orderItens[2].children[0].innerHTML = myDessert.dessertName;
    orderItens[2].children[1].innerHTML = myDessert.dessertCost.toFixed(2);

    // Calculating and writing total cost
    const finalCost = myPlate.plateCost + myDrink.drinkCost + myDessert.dessertCost;
    orderItens[3].children[1].innerHTML = finalCost.toFixed(2);

    // Show confirm window (changing display none to flex)
    const confirmWindow = document.getElementById("confirmWindow");
    confirmWindow.style.display = "flex";
}

function confirmOrder() {

    // Getting customer infos
    const customerName = prompt("Digite seu nome");
    const customerAddress = prompt("Digite o endereço de entrega. (Rua Exemplo, nº 00, complement, bairro)");
    
    // Calculating total
    const finalCost = myPlate.plateCost + myDrink.drinkCost + myDessert.dessertCost;

    // Writing whatsapp message on right pattern
    const strMessage = "Olá, gostaria de fazer o pedido \n - Prato: " + myPlate.plateName + "\n - Bebida: " + myDrink.drinkName + "\n - Sobremesa: " + myDessert.dessertName + "\n Total: R$ " + finalCost.toFixed(2) + "\n \n Nome: " + customerName + "\n Endereço: " + customerAddress;
    const URIencodeMessage = encodeURIComponent(strMessage);

    // opening whatsapp
    const wppStr = "https://wa.me/5521967670121?text=" + URIencodeMessage;
    window.open(wppStr);

    // After confirm, hide confirmWindow
    const confirmWindow = document.getElementById("confirmWindow");
    confirmWindow.style.display = "none";
}


function cancelOrder() {
    const confirmWindow = document.getElementById("confirmWindow");
    confirmWindow.style.display = "none";
}
