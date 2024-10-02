const header = document.querySelector("header");
const bottomButtons = document.querySelectorAll(".bottom-buttons i");
const buttonNav = document.querySelector("nav button");
const iButtonNav = document.querySelector("nav button i");
const navegation = document.querySelector(".navegation");

const cardsContentMainImg = document.querySelector(".cards_content_main_img");
const imagemCards = document.createElement("img");

const footerFilms = document.querySelector(".footer_films");
const footerSeries = document.querySelector(".footer_series");
const footerProduto = document.querySelector(".footer_produto");

const text_content_a = document.querySelector(".text_content a");

let dados = null;
let index = 0;

let indeximagemCard = 0; // controle da imagem de filmes
let indeximagensCard = 0; // controle da imagem de fundo

let carrinhoIndex = [];
let verificaBotao = 0;

document.addEventListener("DOMContentLoaded", function() {
  carregarDadosFooter();
  const menuItems = document.querySelectorAll(".dropdow a");

  menuItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      const page = item.getAttribute("data-page");

      window.location.href = `${page}`;
    });
  });
})

function createAllImage() {
  filmesCardsArray.forEach(function (imagemData) {
    const h1 = document.createElement("h1");
    h1.textContent = imagemData.h1;

    const a = document.createElement("a");
    a.textContent = h1.textContent;

    footerFilms.appendChild(a);
    alert(a);
  });

  sagasCardsArray.forEach(function (imagemData) {
    const h1 = document.createElement("h1");
    h1.textContent = imagemData.h1;

    const a = document.createElement("a");
    a.textContent = h1.textContent;

    footerSeries.appendChild(a);
  });

  produtosCardsArray.forEach(function (imagemData) {
    const h1 = document.createElement("h1");
    h1.textContent = imagemData.h1;

    const a = document.createElement("a");
    a.textContent = h1.textContent;

    footerProduto.appendChild(a);
    const div = document.createElement("div");
    div.className = "card";

    cardsContentMainImg.appendChild(div);
  });
}

function mudaOpacidadeBotao(index) {
  bottomButtons.forEach(function (button) {
    button.classList.remove("active");
  });
  bottomButtons[index].classList.add("active");
}

const h1 = document.getElementById("text_content_h1");
const p1 = document.getElementById("text_content_p1");
const p2 = document.getElementById("text_content_p2");

function headerFunction() {
  header.style.backgroundImage = "";
  h1.textContent = "";
  p2.textContent = "";
  p1.textContent = "";

  header.style.backgroundImage = imagensCard[indeximagemCard].backgroundImage;
  h1.textContent = imagensCard[indeximagemCard].h1;
  p2.textContent = imagensCard[indeximagemCard].p;
  p1.textContent = imagensCard[indeximagemCard].cardsContentMainImgTwoP;

  mudaOpacidadeBotao(indeximagemCard);

  if (indeximagemCard + 1 >= imagensCard.length) {
    indeximagemCard = 0;
  } else {
    indeximagemCard = indeximagemCard + 1;
  }
}

function content() {
  if (dados) {
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

    dados.produtosCardsArray.forEach(function (data, idx) {
      const imagemCards = document.createElement("img");
      imagemCards.src = data.src;
      imagemCards.alt = data.alt;

      const buttonOne = document.createElement("button");
      buttonOne.textContent = "+ Adicionar ao carrinho";
      let isActive = false;
      buttonOne.addEventListener("click", () => {
        isActive = !isActive;
        if (isActive) {
          buttonOne.classList.add("active");
          //verifico se o elemento idx existe no carrinhoIndex
          //caso este elemento nao exista eu o adiciono
          //caso este elemento exista exista nao o adiciono
          if (!carrinhoIndex.includes(idx)) {
            //Adiciono o elemento idx ao array pelo push(empurrar)
            carrinhoIndex.push(idx);
          }
        } else {
          buttonOne.classList.remove("active");
          const indexRemove = carrinhoIndex.indexOf(idx);
          //Recebo no indexRemove o idx e por meio
          //do if abaixo verifico se o item existe,
          //caso a expressao for -1, o item idx nao existe
          if (indexRemove !== -1) {
            //Pego o elemento do array de index verificado
            //este index sendo indexRemove, e retiro um elemento
            carrinhoIndex.splice(indexRemove, 1);
          }
        }
      });
      const buttonTwo = document.createElement("button");
      buttonTwo.textContent = "Ver produto";
      const aButtonTwo = document.createElement("a");
      aButtonTwo.href = data.cardLink;
      aButtonTwo.appendChild(buttonTwo);

      const card = document.createElement("div");
      card.className = "card";

      const p = document.createElement("p");
      p.textContent = data.p;

      const h1 = document.createElement("h1");
      h1.textContent = data.h1;

      const a = document.createElement("a");
      a.textContent = data.a;

      cardsContentMainImg.appendChild(card);
      card.appendChild(imagemCards);
      card.appendChild(p);
      card.appendChild(h1);
      card.appendChild(buttonOne);
      card.appendChild(aButtonTwo);

      footerProduto.appendChild(a);
    });
    
    text_content_a.addEventListener("click", ()=> {
      if(carrinhoIndex.length === 0) {
        alert("Nenhum item selecionado");
      } else {
        text_content_a.href = "./abaProdutosFilmes/produtos.html";
        localStorage.setItem("carrinhoIndex", JSON.stringify(carrinhoIndex));
      }
    });

    let isClick = false
    buttonNav.addEventListener("click", function () {
      isClick = !isClick;
      if(isClick){
        navegation.classList.add("active");
        iButtonNav.className = "fas fa-times";
        buttonNav.classList.add("rotate"); 
      } else {
        navegation.classList.remove("active");
        iButtonNav.className =  "fas fa-solid fa-bars";
        buttonNav.classList.remove("rotate");
      }
    });
  } else {
    alert("dados ainda não carregados!");
  }
}

async function carregarDadosFooter() {
  try {
    const resposta = await fetch("../data.json");
    dados = await resposta.json();
    content();
  } catch (erro) {
    console.error("Erro ao carregar o JSON", erro);
  }
}

/*setInterval(cardBeastFilmsContent, 3000); */
