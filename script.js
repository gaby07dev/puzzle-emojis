const box_block = document.querySelectorAll(".box-block");
const box_emoji = document.querySelectorAll(".box-emoji");
const container = document.querySelector(".main-container");



function comenzarJuego(){
    const listEmoji = listaDeEmojis(); // retorna una array con los emojis ordenados aleatoriamente.
    
    box_emoji.forEach(function(emoji,i){ // injecta los emojis dentro del dom
        emoji.textContent = listEmoji[i];
    });
}
comenzarJuego(); 

function listaDeEmojis(){
    const listEmoji = ["🐻", "🦊", "🐯","🦁", "🐯","🐻", "🦁", "🦊", "🐶", "🐱", "🐼", "🐨", "🐸", "🐵", "🦄", "🐴", "🐱", "🐼", "🐶", "🐨", "🐴", "🐸", "🦄", "🐵"];
    
    return listEmoji.sort(function() { return Math.random() - 0.5 });
    //La función Math.random() nos devuelve un número aleatorio entre 0 y 0.9999..., lo que conseguimos al restarle 0.5 es que nos genere números negativos y positivos para que la función sort() nos re-ordene el array de forma aleatoria colocando un elemento delante otro detrás.
}

box_block.forEach( (box,i) => { // agregar el evento click a todos los elementos para mostrar u ocultar el icono
    box.addEventListener("click", function (){
        let sign = document.querySelectorAll(".sing-interrogation");
        sign[i].classList.toggle("hide");
    })
});

container.addEventListener("click", function(element){

    if(element.target.className === "sing-interrogation hide") {
        capturarEmoji(element.target);
        // console.log(element.target.parentNode.children[1].textContent);
        // capturarEmoji(element.target.parentNode.children[1].textContent);


    }
})
let list = [];
function capturarEmoji(element){
    if(list.length < 2 && list[0] !== element){
        // comprobamos que el array no tenga mas de elementos y que a su ves no sea el mismo elemento clickeado.
        list.push(element);
    }

    if(list.length === 2 && (list[0].parentNode.children[1].textContent !== list[1].parentNode.children[1].textContent)){ // si ya hay dos elementos podemos comprobrar si son parejas o no.
        ocultarElemento(list); 
    }
    if(list.length === 2){ 
        // si el tiene dos elementos reseteamos para poder volver a comparar
        if(list[0].parentNode.children[1].textContent === list[1].parentNode.children[1].textContent){
            list[0].parentNode.children[1].classList.add("done");
            list[1].parentNode.children[1].classList.add("done");
            // Sin encontramos la pareja activamos la clase "done" para que no se vuelva a ocultar el emoji si hacemos click encima y cambia el bg a color verde 
            parejaCompleta(); // avisa que se completó una pareja
        }
        list = [];    

    }
}

function ocultarElemento(elementos){
    setTimeout(function(){
        elementos[0].classList.toggle("hide");
        elementos[1].classList.toggle("hide");
    },500);
    // se ejecutar luego de 500 milisegundos         
}
let parejasCompletas = 0;
function parejaCompleta(){
    ++parejasCompletas;
    if(parejasCompletas === 12) // si llega a 12 parejas se completa el juego
        setTimeout(function(){
            alert("Felicidades!!! Completaste el juego!!")
            location.reload();
        },500);
}
