//pegando o botao start
const btnStart = document.getElementById("submit");

//funcao do botao start
btnStart.addEventListener("click", () => {
    
    //pegando o cronometro que sera mostrado na tela    
    display = document.getElementById("timer");
    
    //------validacao de formulario------
    const eventName = document.getElementById("txtNome").value;

    //pegando a data de hoje  
    let today = new Date();

    //pegando o mes atual
    let currentMonth = document.getElementById("month");
    currentMonth = today.getMonth() +1;

    //pegando o ano atual
    let currentYear = document.getElementById("year");
    currentYear = today.getFullYear();

    //pegando o dia atual
    let currentDay = document.getElementById("day");
    currentDay = today.getDate();

    //enviando mensagens de alerta para que o usuario preencha os campos corretamente
    if(eventName == "") {
        alert("please type the event name");
        window.location.reload();
        document.getElementById("txtNome").focus();

    } else if(document.getElementById("year").value < currentYear) {
        alert("please type a valid year");
        window.location.reload();
        documento.getElementById("year").focus();

    } else if(document.getElementById("year").value == currentYear && document.getElementById("month").value < currentMonth) {
        alert("please type a valid month");
        window.location.reload();
        document.getElementById("month").focus();

    } else if ((document.getElementById("year").value == currentYear && document.getElementById("month").value <= currentMonth) && document.getElementById("day").value < currentDay) {
        alert("please type a valid day");
        window.location.reload();
    }
    //-------fim da validacao do formulario-----

    //coloca na tela o nome do evento inputado
    const paragraph = document.getElementById("event");
    paragraph.innerHTML = `event name: ${eventName}`;
    
    //chamando funcao que dispara cronometro
    timer(display);
});

//variavel pra ligar o alarme
let alarm = false;

//funcao que dispara o cronometro
const timer = (display) => {

    //manipulando o checkbox de ligar o alarme para usar no final, quando o tempo = 0
    const checkbox = document.querySelector("input[name=checkbox]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            console.log("Checkbox is checked..");
            alarm = true;         
        } else {
            console.log("Checkbox is not checked..");
            }
        });

    //executar uma funcao a cada um segundo
    let intervalo = setInterval(() => {

        //capturando os valores inputados
        let year = document.getElementById("year").value;
        let month = document.getElementById("month").value;   
        let day = document.getElementById("day").value;
        let hours = document.getElementById('hour').value;
        let minutes = document.getElementById("minute").value;
        let seconds = document.getElementById("second").value;
        
        //montando a data no formato May 23, 2023 hh:MM:ss
        const date = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;

        //contando os millissegundos desde a data inputada ate a data/hora corrente
        const countDateMilisseconds = new Date(date).getTime();
        const now = new Date().getTime();
        let timer = countDateMilisseconds - now;

        //colocando nos valores que aparecerao na tela
        days = Math.floor(timer / (1000 * 60 * 60 * 24));
        hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timer % (1000 * 60)) / 1000);

        //mantendo dois caracteres no display
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //alterando o valor html do display, pra mudar o cronometro na tela
        display.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

        //decrementando 1 do timer, que eh a duracao
        timer = timer - 1;

        //mudando o display quando o tempo acabar:
        if(timer < 0) {
            display.innerHTML = `chegou o dia do evento ${document.getElementById("txtNome").value}!`;
            //parar de diminuir o timer
            clearInterval(intervalo);  
            //tocando o alarme caso a checkbox esteja ligada
            if(alarm == true) {
                const audio = document.getElementById("audio");
                audio.play();
            }            
        }
    }, 1000);   
}

//pegando botao restart
const btnRestart = document.getElementById("resetBtn");

//funcao do botao restart de att a pagina
btnRestart.addEventListener("click", () => {
    window.location.reload();
});



