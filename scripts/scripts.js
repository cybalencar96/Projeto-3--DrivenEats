function selectPlate(num) {
    const plates = document.getElementsByClassName("plates");


    // Unchecking all plates
    for (i = 0; i < plates.length; i++){
        plates[i].classList.remove("choosen");
        plates[i].children[4].style.display = "none"
    }

    // Checking one plate
    plates[num].classList.add("choosen");
    plates[num].children[4].style.display = "inherit"
}

function selectDrink(num) {
    const drinks = document.getElementsByClassName("drinks");
    // Unchecking all drinks
    for (i = 0; i < drinks.length; i++){
        drinks[i].classList.remove("choosen");
        drinks[i].children[4].style.display = "none"
    }

    // Checking one plate
    drinks[num].classList.add("choosen");
    drinks[num].children[4].style.display = "inherit"
    
}

function selectDessert(num) {
    const desserts = document.getElementsByClassName("desserts");
    // Unchecking all desserts
    for (i = 0; i < desserts.length; i++){
        desserts[i].classList.remove("choosen");
        desserts[i].children[4].style.display = "none"
    }

    // Checking one plate
    desserts[num].classList.add("choosen");
    desserts[num].children[4].style.display = "inherit"
    
}