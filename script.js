
let senhaFixa = 14
const senhaInput = document.querySelector("#senhaInput");
const uppercaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const tamanhoSenhaBarraEl = document.getElementById("barraDeSeguranca");

function gerarSenha(){
    let caractere = "abcdefghijklmnpqrstuvxz"

    const uppercaseCheck = "ABCDEFGHIJKLMNPQRSTUVXZ123456789"
    const numberCheck = "123456789"
    const symbolCheck = "!@#$%&*(){}[]/?<>"

    if(uppercaseCheckEl.checked){
        caractere += uppercaseCheck
    }
    if(numberCheckEl.checked){
        caractere += numberCheck
    }
    if(symbolCheckEl.checked){
        caractere += symbolCheck
    }

    let senha = ""

    for(let i = 0; i<senhaFixa; i++){
        const randoNumero = Math.floor(Math.random()* caractere.length)
        senha += caractere.substring(randoNumero, randoNumero + 1)
        
    }
    
    senhaInput.value = senha
   
    calculoDeQualidade()

    calcularFonte()

    }

    function calculoDeQualidade(){
        const percent = Math.round(
            (senhaFixa / 40) * 25 +
            (uppercaseCheckEl.checked ? 15 : 0) +
            (numberCheckEl.checked ? 25 : 0 ) +
            (symbolCheckEl.checked ? 35 : 0)
        )
      
        tamanhoSenhaBarraEl.style.width = `${percent}%`
        
        

        if(percent > 49){
            tamanhoSenhaBarraEl.classList.remove("critical")
            tamanhoSenhaBarraEl.classList.remove("warnig")
            tamanhoSenhaBarraEl.classList.add("safe")
        }else if(percent >30){
            tamanhoSenhaBarraEl.classList.remove("critical")
            tamanhoSenhaBarraEl.classList.add("warnig")
            tamanhoSenhaBarraEl.classList.remove("safe")
        }else{
            tamanhoSenhaBarraEl.classList.add("critical")
            tamanhoSenhaBarraEl.classList.remove("warnig")
            tamanhoSenhaBarraEl.classList.remove("safe")
        }

        if(percent >= 100){
            tamanhoSenhaBarraEl.classList.add("completed")
        }else{
            tamanhoSenhaBarraEl.classList.remove("completed")
        }
    }

    function calcularFonte(){
        if(senhaFixa>35){
            senhaInput.classList.remove("font-sm")
            senhaInput.classList.remove("font-xs")
            senhaInput.classList.add("font-xxs")
        }else if(senhaFixa > 22){
            senhaInput.classList.remove("font-sm")
            senhaInput.classList.add("font-xs")
            senhaInput.classList.remove("font-xxs")
        }else if(senhaFixa > 12){
            senhaInput.classList.add("font-sm")
            senhaInput.classList.remove("font-xs")
            senhaInput.classList.remove("font-xxs")
        }else{
            senhaInput.classList.remove("font-sm")
            senhaInput.classList.remove("font-xs")
            senhaInput.classList.remove("font-xxs")
        }
    }

    function copiar(){
        navigator.clipboard.writeText(senhaInput.value)
    }

    const senhaGerada = document.querySelector("#range")
    senhaGerada.addEventListener("input", function(){
        senhaFixa = senhaGerada.value
        document.querySelector("#tamanhoSenhaTexto").innerText = senhaFixa
        gerarSenha()
    })

    uppercaseCheckEl.addEventListener("click", gerarSenha)
    numberCheckEl.addEventListener("click", gerarSenha)
    symbolCheckEl.addEventListener("click", gerarSenha)

    document.querySelector("#copiar-1").addEventListener("click", copiar)
    document.querySelector("#copiar-2").addEventListener("click", copiar)
    document.querySelector("#renovar").addEventListener("click", gerarSenha)

gerarSenha()