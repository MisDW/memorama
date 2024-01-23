const box_game = document.querySelector(".box_game");
const box_cartas = document.querySelector(".box_cartas");
const cont_btn = document.querySelector(".cont_btn");
const capa_negro = document.querySelector(".capa_negro");
const vidas = document.querySelector(".vidas")
const numeros_cuenta_regresiva = document.querySelector(".numeros_cuenta_regresiva")
document.getElementById("btn_start").onclick = () => start();

//empieza el juego quitando la barrera
function start() {
        bloqueo_de_cartas(6000, true)
        capa_negro.style.display="none";
        cont_btn.style.display="none";
        var cartas_revueltas = cambiar_n_aleatorio();
        box_cartas.innerHTML = "";
        aleatorio(cartas_revueltas)
         
         var car = document.querySelectorAll(".car")
         escuchar(car)
         memorisacionCartas(car)
         vidas.innerHTML = `Life: ${old_life = lifes}`;

         setTimeout(() => {
            time()
         }, 3000);
}

var cuentaAtras = 4

const memorisacionCartas = (carta) =>{
    var old_CuentaAtras = cuentaAtras
    var cuentaRegresiva = setInterval(() => {
        old_CuentaAtras--
        animacion_numeros(old_CuentaAtras)
        old_CuentaAtras == 0 ? clearInterval(cuentaRegresiva) : console.warn("Contando...");
    }, 1000);


    carta.forEach(item => {
        setTimeout(() => {
            item.className = "car on_volteo"
            setTimeout(() => {
                item.className = "car off_volteo"
            }, 1000);
        }, 4000);
    });
}

const animacion_numeros = (cuentaAtras) => {
    const numerosCuentas = document.querySelector(".numeros_cuentas")
    const numeroCuentas = document.getElementById("numero_cuentas")

    numerosCuentas.style.display = "grid";
    numeroCuentas.innerHTML = `${cuentaAtras}`
    if (cuentaAtras == 3) {
        numerosCuentas.style.color = "lime"        
    }else if (cuentaAtras == 2) {
        numerosCuentas.style.color = "orange"        
    }else if(cuentaAtras == 1){
        numerosCuentas.style.color = "red"        
    }else if(cuentaAtras == 0){
        numerosCuentas.style.display = "none"        
    }
}

timeLimit = 45
oldTime = timeLimit

// Cuenta regresiva del juego
const time = () => {
    intervalo = setInterval(() => {     
        if (oldTime <= 0) {
            partida_perdida(5)
        }
        tiempo = document.querySelector(".tiempo").innerHTML = `Time: ${oldTime--}s`
    }, 1000);
}

var mask_box_cartas = document.querySelector(".mask_box_cartas");

const escuchar = (car) =>{
    car.forEach(item => {
        item.addEventListener('click', (e)=>{
            if (item.className !== "cartaCorrecta") {
                bd_similitud.push(item); /*Mete la carta a una base de datos con su __"id"__ en una base de datos _____var comp = comparar(c)____*/
                animacion_cartas(item); //animacion de carta
                carta_acceptada();//retorna la id y la compara
            }else{
                console.warn("La carta ya esta correcta");
            }
        })
    })
}

/*___Insercion de cartas aleatorias en el DOM____*/
function aleatorio(cartas_revueltas) {
    box_cartas.innerHTML = "";
    for (var i = 0; i <= 11; i++) {      
        var n_c = cartas_revueltas[i];
        box_cartas.innerHTML+=`
        <div class="car off_volteo" id="${n_c} c${i}">
        <img src="img/dulces/cart/dulce${n_c}.png" alt="dulce">
        </div>
        `
    }
}

// Funcion de aleatoridad de numeros
function cambiar_n_aleatorio() {
    var myArray = ['1','1','2','2','3','3','4','4','5','5','6','6'];
    var i,j,k;
    for (i = myArray.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = myArray[i - 1];
        myArray[i - 1] = myArray[j];
        myArray[j] = k;
    }
    return myArray;
}

//animacion de carta
function animacion_cartas(o) {
    switch (o.className) {
        case "car off_volteo":
            o.className = "car on_volteo";
            break;
        case "car on_volteo":
            o.className = "car off_volteo";
            break;
        default:
            console.log("Error");
            break;
    }
}

var aciertos = 0;
var errores = 0;
var lifes = 5;
var old_life = lifes

function carta_acceptada() {
    var carta = document.querySelectorAll(".car");
    if (bd_similitud[0].id[0] == bd_similitud[1].id[0] && bd_similitud[0] != bd_similitud[1]) {
        bloqueo_de_cartas(1000)
        carta1 = bd_similitud[0];
        carta2 = bd_similitud[1];
        if (carta1.id[0] == carta2.id[0]) {
            carta1.className = "cartaCorrecta";
            carta2.className = "cartaCorrecta";
            bd_similitud = [];
            aciertos++;
            console.log("aciertos:", aciertos);
            partida_ganada(aciertos);
        }
    } else if (bd_similitud[0] == bd_similitud[1]) {
        if (bd_similitud[0].className == "cartaCorrecta") {
            console.log("Nothing");
            bd_similitud = [];
        } else {
            firtsCard = bd_similitud.shift()
            firtsCard.className = "car on_volteo";
            console.log(bd_similitud);
        }

    } else {
        bloqueo_de_cartas(1000)
        bd_similitud = [];
        errores++;
        console.log("errores:", errores);
        partida_perdida(errores);
        setTimeout(() => {
            carta.forEach(e => {
                e.className = "car off_volteo";
            });
        }, 1000);
        old_life--
        vidas.innerHTML = `Life: ${old_life}`;
    }
    }

// Array de items (Cartas)
var bd_similitud = [];
//calcula los aciertos y errores
var part_ganadas=0;
var part_perdidas=0;

const bloqueo_de_cartas = (time_block, especial) =>{
    if (bd_similitud.length == 2 || especial == true) {
        mask_box_cartas.style.display = "block"
        setTimeout(() => {
            mask_box_cartas.style.display = "none"
        }, time_block);
    }
}

function partida_ganada(n_aciertos) {
    if (n_aciertos == 6) {
        console.warn("_________✔-ganaste-✔_________");
        show_ganador(n_aciertos);
    }
}

function partida_perdida(n_errores) {
    if (n_errores == 5) {
        console.warn("_________✔-perdiste-✔_________");
        show_perdedor(n_errores)
    }
}

//muestra el mensaje de ganador 
//es pura estilizacion
function show_ganador(a) {
    capa_negro.style.background="rgba(35, 214, 44, 0.678)";
    capa_negro.style.display="block";
    cont_btn.style.display="block"
    cont_btn.innerHTML=`
    <span>¡You Win!</span><br>
    <input type="button" value="Restart" id="btn_start" onclick="start(1)">
    `;
    reset_stadistics()
    part_ganadas++;
    document.querySelector(".part_ganadas").innerHTML = `Win: ${part_ganadas}`
}

function show_perdedor(e) {
    capa_negro.style.background="rgba(170, 13, 13, 0.678)";
    capa_negro.style.display="block";
    cont_btn.style.display="block"
    cont_btn.innerHTML=`
    <span>¡You Lose!</span><br>
    <input type="button" value="Restart" id="btn_start" onclick="start(1)">
    `;
    reset_stadistics()
    part_perdidas++;
    document.querySelector(".part_perdidas").innerHTML = `Lose: ${part_perdidas}`
}

const reset_stadistics = () => {
    errores= 0;
    aciertos= 0;
    old_life = lifes;
    stop()
}

// Para el juego y lo reinicia para volver a iniciar
const stop = () =>  {
    clearInterval(intervalo);
    oldTime = timeLimit
}
