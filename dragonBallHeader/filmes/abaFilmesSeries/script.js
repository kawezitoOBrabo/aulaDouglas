const sinopse = localStorage.getItem("sinopse");
const sinopseContent = document.getElementById("sinopse");
sinopseContent.textContent = sinopse.toString();

const duracao = localStorage.getItem("duracao");
const duracaoContent = document.getElementById("duracao");
duracaoContent.textContent = duracao.toString();

const ano = localStorage.getItem("ano");
const anoContent = document.getElementById("ano");
anoContent.textContent = ano.toString();

const img = localStorage.getItem("img");
const imgContent = document.getElementById("img");
imgContent.src = img.toString();

const index = localStorage.getItem("index");
let indexInt = parseInt(index);

const footerFilms = document.querySelector(".footer_films");
const footerSeries = document.querySelector(".footer_series");
const footerProduto = document.querySelector(".footer_produto");

let dados = null;

const arrowLeft = document.querySelector(".arrow_left");
const arrowRight = document.querySelector(".arrow_right");

document.addEventListener("DOMContentLoaded", () => {
  carregarDadosFooter();
});

function content() {   
  let dadosLength = dados.filmesCardsArray.length;

  arrowLeft.addEventListener("click", function () {
    if (indexInt < dadosLength && indexInt > 0) {
      indexInt = indexInt - 1;
      sinopseContent.textContent = dados.filmesCardsArray[indexInt].sinopse;
      duracaoContent.textContent = dados.filmesCardsArray[indexInt].duracao;
      anoContent.textContent = dados.filmesCardsArray[indexInt].ano;
      imgContent.src = dados.filmesCardsArray[indexInt].src;
      arrowLeft.className = "arrow_right";
    } else {
      arrowLeft.className = "active";
    }
  });
  arrowRight.addEventListener("click", function () {
    if (indexInt < dadosLength && indexInt > 0) {
      indexInt = indexInt + 1;
      sinopseContent.textContent = dados.filmesCardsArray[indexInt].sinopse;
      duracaoContent.textContent = dados.filmesCardsArray[indexInt].duracao;
      anoContent.textContent = dados.filmesCardsArray[indexInt].ano;
      imgContent.src = dados.filmesCardsArray[indexInt].src;
      arrowRight.className = "arrow_left";
    } else{
      arrowRight.className = "active";
    }
  });

  dados.filmesCardsArray.forEach(function (data) {
    const h1 = document.createElement("h1");
    h1.textContent = data.h1;

    const a = document.createElement("a");
    a.textContent = h1.textContent;

    footerFilms.appendChild(a);
  });

  dados.sagasCardsArray.forEach(function (data) {
    const h1 = document.createElement("h1");
    h1.textContent = data.h1;

    const a = document.createElement("a");
    a.textContent = h1.textContent;

    footerSeries.appendChild(a);
  });

  dados.produtosCardsArray.forEach(function (data) {
    const a = document.createElement("a");
    a.textContent = data.a;

    footerProduto.appendChild(a);
  });
}

async function carregarDadosFooter() {
  try {
    const resposta = await fetch("../../data.json");
    dados = await resposta.json();
    if (dados) {
      content();
    } else {
      console.error("error");
    }
  } catch (erro) {
    console.error("Erro ao carregar o JSON", erro);
  }
}
