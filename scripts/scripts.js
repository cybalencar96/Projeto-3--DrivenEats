// Creating global objects
function plate (plateSelected,plateName,plateCost) {
    this.plateName = plateName;
    this.plateCost = plateCost;
    this.plateSelected = plateSelected;
}

const myPlate = new plate;

function drink (drinkSelected,drinkName,drinkCost) {
    this.drinkName = drinkName;
    this.drinkCost = drinkCost;
    this.drinkSelected = drinkSelected;

}

const myDrink = new drink;

function dessert (dessertSelected,dessertName,dessertCost) {
    this.dessertName = dessertName;
    this.dessertCost = dessertCost;
    this.plateSelected = dessertSelected;
}

const myDessert = new dessert;
// ----------------------------------------

function selectItem(selectedItem,itemType) {

    const lastItemSelected = document.querySelector("." + itemType + " .choosen");

    // if exists any selected item
    if (lastItemSelected !== null){
        // unmark last item selected
        lastItemSelected.classList.remove("choosen");
        lastItemSelected.children[4].style.display = "none";
    }

    // if new selection is the same as the last one
    if (selectedItem === lastItemSelected) {
        selectedItem.classList.remove("choosen");
        selectedItem.children[4].style.display = "none";

        if (itemType === 'plates') {
            myPlate.plateSelected = false;
        } else if (itemType === 'drinks') {
            myDrink.drinkSelected = false;
        } else if (itemType === 'desserts') {
            myDessert.dessertSelected = false;
        }
        enableSendButton();

        // exit function, no need to select again
        return;
    }

    // select new item
    selectedItem.classList.add("choosen");
    selectedItem.children[4].style.display = "initial";

    // Save item name and cost, workink on cost string
    const itemName = selectedItem.children[1].innerHTML;
    let itemCost = selectedItem.children[3].innerHTML;
    itemCost = itemCost.replace("R$ " , "");
    itemCost = Number(itemCost.replace("," , "."));


    if (itemType === 'plates') {
        myPlate.plateName = itemName;
        myPlate.plateCost = itemCost;
        myPlate.plateSelected = true;
    } else if (itemType === 'drinks') {
        myDrink.drinkName = itemName;
        myDrink.drinkCost = itemCost;
        myDrink.drinkSelected = true;
    } else if (itemType === 'desserts') {
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
        sendButton.innerHTML = "Fechar pedido";
        
        sendButton.setAttribute("onclick", "openConfirmWindow()");
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

    // Show confirm window
    const confirmWindow = document.getElementById("confirmWindow");
        // first remove display none
        confirmWindow.classList.remove('hidden');
        // then insert opacity 1. Using setTimeout to make JS wait until class 'hidden' is totally removed
        setTimeout(() => {
            confirmWindow.classList.remove('visuallyHidden');
        },20);

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
    confirmWindow.classList.add("hidden");
    confirmWindow.classList.add('visuallyHidden');

}


function cancelOrder() {
    const confirmWindow = document.getElementById("confirmWindow");

    // fist visually hide window with opacity
    confirmWindow.classList.add('visuallyHidden');

    // when opacity transition is over, add class hidden to insert diplay none
    confirmWindow.addEventListener('transitionend', () => {
        confirmWindow.classList.add('hidden');
    }, {
        /* making once true to listen transitionend just one time. Otherwise the function would end but the 
         eventListener would still work */
        once: true
    });


}
