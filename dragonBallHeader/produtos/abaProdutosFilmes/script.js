const header = document.querySelector("header");
const bottomButtons = document.querySelectorAll(".bottom-buttons i");

const cardsContentMainImg = document.querySelector(".cards_content_main_img");
const imagemCards = document.createElement("img");

const footerFilms = document.querySelector(".footer_films");
const footerSeries = document.querySelector(".footer_series");
const footerProduto = document.querySelector(".footer_produto");
let dados = null;
let index = 0;

let indeximagemCard = 0; // controle da imagem de filmes
let indeximagensCard = 0; // controle da imagem de fundo

let carrinhoIndex = JSON.parse(localStorage.getItem("carrinhoIndex"));
carrinhoIndex.sort((a, b) => a - b)
let verificaBotao = 0;


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
      let isActive = false;
      /*
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
        carrinhoIndex.forEach((item) => {
          alert(item);
        });
      }); */
      const a = document.createElement("a");
      a.textContent = data.a;

      footerProduto.appendChild(a);
    });

    carrinhoIndex.forEach(
      function(idx) {
        const data = dados.produtosCardsArray[idx]; // Acessa os dados do card correspondente
        alert(data.src);
        alert(idx);

        const imagemCards = document.createElement("img");
        imagemCards.src = data.src;
        imagemCards.alt = data.alt;

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
        card.appendChild(imagemCards);
        card.appendChild(p);
        card.appendChild(h1);
        card.appendChild(aButtonTwo);
        
        cardsContentMainImg.appendChild(card);
      }
    );
  } else {
    alert("dados ainda não carregados!");
  }
}
let indexCa = 0;
async function carregarDadosFooter() {
  try {
    const resposta = await fetch("../../data.json");
    dados = await resposta.json();
    carrinhoIndex.forEach(
      function() {
        carrinhoIndex[indexCa];
        indexCa++;
      }
    )
    content();
  } catch (erro) {
    console.error("Erro ao carregar o JSON", erro);
  }
}

carregarDadosFooter();
/*setInterval(cardBeastFilmsContent, 3000); */
