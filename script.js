var backgroundImageDiv = document.querySelector("#background-image-div")
var obrImg = document.querySelector("#obr-img")

var imagensClicaveis = document.querySelectorAll(".imagens-clicaveis")
var imagensAmpliadas = document.querySelectorAll(".imagens-ampliadas")
var fundo = document.querySelector("#fundo")

var box = document.querySelectorAll(".box")
var boxv = document.querySelectorAll(".boxv")
var boxf = document.querySelectorAll(".boxf")

var alternativas = document.querySelectorAll("ol[type='a'] li")
var letras = document.querySelectorAll(".letras")
var letraAssinalada = ""
var alternativaClicada
var aviso = document.querySelector("#aviso")
var timeoutAviso
var verificarBtn = document.querySelector("#verificar-btn")
var explicacao = document.querySelector("#explicacao")

window.onload = function() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        images[i].onmousedown = function(e) {
            if (e.preventDefault) e.preventDefault();
            return false;
        }
    }
}

document.addEventListener("scroll", () => {
    if (scrollY > 10) {
        obrImg.style.opacity = 1
        backgroundImageDiv.style.filter = "blur(10px)"
    } else {
        obrImg.style.opacity = 0
        backgroundImageDiv.style.filter = "blur(0px)"
    }
})
obrImg.addEventListener("click", () => location.href = "#main-scroll")

imagensClicaveis.forEach((img) => {
    img.addEventListener("click", () => ampliarImg(img))
})

imagensAmpliadas.forEach((img) => {
    img.addEventListener("click", () => reduzirImg(img))
    fundo.addEventListener("click", () => reduzirImg(img))
})

function ampliarImg(img) {
    var imagemAtual = document.querySelector(`#${img.id.replace("img", "ampliado")}`)
    document.body.style.overflowY = "hidden"
    fundo.style.display = "block"
    imagemAtual.style.display = "block"
    setTimeout(() => {
        fundo.style.opacity = 1
        imagemAtual.style.opacity = 1
    }, 1);
}

function reduzirImg(img) {
    var imagemAtual = document.querySelector(`#${img.id.replace("img", "ampliado")}`)
    document.body.style.overflowY = "visible"
    fundo.style.opacity = 0
    imagemAtual.style.opacity = 0
    setTimeout(() => {
        fundo.style.display = "none"
        imagemAtual.style.display = "none"
    }, 500);
}

for (var alt = 0; alt < alternativas.length; alt++) {
    alternativas[alt].addEventListener("click", (function (alt) {
        return function () {
            alternativaClicada = alt
            if (!alternativas[alt].classList.contains("clicado")) {
                for (let i = 0; i < alternativas.length; i++) {
                    alternativas[i].classList.remove("clicado")
                }
                alternativas[alt].classList.add("clicado")
                letraAssinalada = letras[alt].innerText.toLowerCase()
                verificarBtn.classList.remove("desabilitado")
            } else {
                alternativas[alt].classList.remove("clicado")
                letraAssinalada = ""
                verificarBtn.classList.add("desabilitado")
            }
        }
    })(alt))
}


for (let i = 0; i < boxv.length; i++) {
    boxv[i].addEventListener("click", () => {
        if (!boxv[i].classList.contains("clicado")) {
            boxv[i].classList.add("clicado")
            boxf[i].classList.remove("clicado")
        } else {
            boxv[i].classList.remove("clicado")
        }
    })
}

for (let i = 0; i < boxf.length; i++) {
    boxf[i].addEventListener("click", () => {
        if (!boxf[i].classList.contains("clicado")) {
            boxf[i].classList.add("clicado")
            boxv[i].classList.remove("clicado")
        } else {
            boxf[i].classList.remove("clicado")
        }
    })
}

verificarBtn.addEventListener("click", () => verificarResposta(alternativaClicada))
function verificarResposta(alt) {
    if (letraAssinalada == "") {
        aviso.style.color = "#f00"
        aviso.style.opacity = 1
        aviso.innerText = "Você precisa escolher uma opção!"
        setTimeout(() => {
            aviso.style.transitionDuration = "3s"
        }, 1);
        timeoutAviso = setTimeout(() => {
            aviso.style.opacity = 0
            setTimeout(() => {
                aviso.style.transitionDuration = "0s"
            }, 1);
        }, 3000);
    } else {
        for (let i = 0; i < box.length; i++) {
            if (box[i].classList.contains("resultado")) {
                box[i].classList.add("clicado")
            } else {
                box[i].classList.remove("clicado")
            }
            box[i].style.pointerEvents = "none"
        }

        clearTimeout(timeoutAviso)
        aviso.style.transitionDuration = "0s"
        aviso.style.color = "#00c800"
        aviso.style.opacity = 1
        aviso.innerText = "Resposta correta!"

        verificarBtn.classList.add("desabilitado")

        letras[3].style.color = "#00c800"
        letras[3].style.border = "2.5px solid #00c800"

        for (let i = 0; i < alternativas.length; i++) {
            alternativas[i].style.pointerEvents = "none"
            letras[i].style.backgroundColor = "#0000"
        }

        explicacao.style.display = "flex"

        if (letraAssinalada != "d") {
            letras[alt].style.color = "#f00"
            letras[alt].style.border = "2.5px solid #f00"
            aviso.style.color = "#f00"
            aviso.style.opacity = 1
            aviso.innerText = "Resposta incorreta."
        }

    }
}