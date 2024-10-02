const header = document.querySelector("header");
const bottomButtons = document.querySelectorAll(".bottom-buttons i");
const buttonNav = document.querySelector("nav button");
const iButtonNav = document.querySelector("nav button i");
const navegation = document.querySelector(".navegation");

const cardBeastFilms = document.getElementById("cardImage");
const card_beast_films_h1 = document.getElementById("card_beast_films_h1");
const card_beast_films_p = document.getElementById("card_beast_films_p");
const arrowLeft = document.getElementById("arrow_left");
const arrowRight = document.getElementById("arrow_right");

const cardsContentMainImg = document.querySelector(".cards_content_main_img");
const cardsContentMainImgTwo = document.querySelector(
  ".cards_content_main_img_two"
);
const sagas = document.querySelector(".sagas");
const sagas_two = document.querySelector(".sagas_two");

const footerFilms = document.querySelector(".footer_films");
const footerSeries = document.querySelector(".footer_series");
const footerProduto = document.querySelector(".footer_produto");

const watch_now = document.querySelector(".watch-now");
const add_playlist = document.querySelector(".add-playlist");
let playlistIndex = [];

const melhoresSagas = [
  (src =
    "https://i.pinimg.com/originals/d2/8e/05/d28e0519cb8f0952dd003d5272b539e6.jpg"),
  (src =
    "https://i.pinimg.com/originals/6f/25/d7/6f25d771e8682e5212c12766db8b2ebf.jpg"),
  (src =
    "https://i.pinimg.com/originals/54/aa/9e/54aa9eae43fa2c49633d12ec45e4e038.jpg"),
  (src =
    "https://i.pinimg.com/originals/cd/9c/98/cd9c98a79934374f2d47905e0ab0fa5d.jpg"),
  (src =
    "https://i.pinimg.com/564x/70/8f/6c/708f6c262d1249a54faa23e983bb86dc.jpg"),
];
let dados = null;
let index = 0;

let indeximagemCard = 0; // controle da imagem de filmes

document.addEventListener("DOMContentLoaded", function () {
  carregarDadosFooter();
  const menuItems = document.querySelectorAll(".dropdow a");

  menuItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      const page = item.getAttribute("data-page");

      window.location.href = `${page}`;
    });
  });
});

function cardBeastFilmsContent() {
  if (dados) {
    let indiceLeft = dados.filmesCard.length;
    let indiceRight = 0;
    arrowLeft.addEventListener("click", function () {
      if (indiceLeft - 1 > 0) {
        indiceLeft = indiceLeft - 1;
        cardBeastFilms.style.backgroundImage = `url(${dados.filmesCard[indiceLeft].src})`;
      } else if (indiceLeft - 1 <= 0) {
        cardBeastFilms.style.backgroundImage = `url(${dados.filmesCard[0].src})`;
        indiceLeft = dados.filmesCard.length;
      }
    });
    arrowRight.addEventListener("click", function () {
      if (indiceRight + 1 < 5) {
        indiceRight = indiceRight + 1;
        cardBeastFilms.style.backgroundImage = `url(${dados.filmesCard[indiceRight].src})`;
      } else if (indiceRight + 1 >= 5) {
        cardBeastFilms.style.backgroundImage = `url(${dados.filmesCard[0].src})`;
        indiceRight = 0;
      }
    });
  } else {
    alert("Error");
  }
}

function mudaOpacidadeBotao(index) {
  bottomButtons.forEach(function (button, idx) {
    button.classList.remove("active");
    if (idx === index) {
      button.classList.add("active");
    }
  });
}

const h1 = document.getElementById("text_content_h1");
const p1 = document.getElementById("text_content_p1");
const p2 = document.getElementById("text_content_p2");

function headerFunction() {
  if (dados.filmesCard.length > 0) {
    header.style.backgroundImage = `url(${dados.filmesCard[indeximagemCard].src})`;
    h1.textContent = dados.filmesCard[indeximagemCard].h1;
    p2.textContent = dados.filmesCard[indeximagemCard].p;
    p1.textContent = dados.filmesCard[indeximagemCard].cardsContentMainImgTwoP;

    mudaOpacidadeBotao(indeximagemCard);
    watch_now.addEventListener("click", function () {
      const img = dados.filmesCard[indeximagemCard].src;
      dados.filmesCardsArray.forEach((data, idx) => {
        const imgArray = data.src;

        if (imgArray === img) {
          let indice =
            dados.filmesCard.findIndex(
              (filmeCard) => filmeCard.src === imgArray
            ) - 1;
          if (indice !== -1) {
            localStorage.setItem("sinopse", dados.filmesCard[indice].sinopse);
            localStorage.setItem("duracao", dados.filmesCard[indice].duracao);
            localStorage.setItem("ano", dados.filmesCard[indice].ano);
            localStorage.setItem("img", dados.filmesCard[indice].src);
            localStorage.setItem("index", indice);

            window.location.href = "./abaFilmesSeries/abaFilmesSeries.html";
          } else {
            console.error("Imagem não encontrada no array de filmes.");
          }
        }
      });
    });
    add_playlist.addEventListener("click", function () {
      const img = dados.filmesCard[indeximagemCard].src;
      const indice = dados.filmesCard.findIndex(
        (filmeCard) => filmeCard.src === img
      );
      if (indice !== -1) {
        if (!playlistIndex.includes(indice)) {
          playlistIndex.push(indice);
          playlistIndex.sort((a, b) => a - b);
        } else if (playlistIndex.includes(indice)) {
          const indexRemove = playlistIndex.indexOf(indice);
          alert(indexRemove);
          playlistIndex.splice(indexRemove, 1);
          playlistIndex.sort((a, b) => a - b);
        }
      } else {
        console.error("Imagem não encontrada no array de filmes.");
      }
    });

    indeximagemCard++;
    if (indeximagemCard >= dados.filmesCard.length) {
      indeximagemCard = 0;
    }
  } else {
    console.error("Dados não disponíveis ou vazios.");
  }
}

function content() {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card_container";

  const cardContainerTwo = document.createElement("div");
  cardContainerTwo.className = "card_container";

  if (dados) {
    dados.filmesCardsArray.forEach(function (data, idx) {
      const imagemCards = document.createElement("img");
      imagemCards.src = data.src;
      imagemCards.alt = data.alt;

      const aDiv = document.createElement("a");
      aDiv.href = "./abaFilmesSeries/abaFilmesSeries.html";

      const card = document.createElement("div");
      card.className = "card";

      const p = document.createElement("p");
      p.textContent = data.p;

      const h1 = document.createElement("h1");
      h1.textContent = data.h1;

      const a = document.createElement("a");
      a.textContent = h1.textContent;

      aDiv.appendChild(card);
      cardsContentMainImg.appendChild(aDiv);
      card.appendChild(imagemCards);
      card.appendChild(p);
      card.appendChild(h1);

      footerFilms.appendChild(a);

      aDiv.addEventListener("click", function () {
        localStorage.setItem("sinopse", data.sinopse);
        localStorage.setItem("duracao", data.duracao);
        localStorage.setItem("ano", data.ano);
        localStorage.setItem("img", data.src);
        localStorage.setItem("index", idx);
      });
    });

    dados.filmesCard.forEach(function (data) {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = data.src;
      img.alt = data.alt;

      card.appendChild(img);
      cardContainer.appendChild(card);
      cardsContentMainImgTwo.appendChild(cardContainer);
    });

    dados.sagasCardsArray.forEach(function (data) {
      const imagemCards = document.createElement("img");
      imagemCards.src = data.src;
      imagemCards.alt = data.alt;

      const aDiv = document.createElement("a");
      aDiv.href = "./abaFilmesSeries/abaFilmesSeries.html";

      const card = document.createElement("div");
      card.className = "card";

      const p = document.createElement("p");
      p.textContent = data.p;

      const h1 = document.createElement("h1");
      h1.textContent = data.h1;

      const a = document.createElement("a");
      a.textContent = h1.textContent;

      aDiv.appendChild(card);

      sagas.appendChild(aDiv);

      card.appendChild(imagemCards);
      card.appendChild(p);
      card.appendChild(h1);

      footerSeries.appendChild(a);
    });

    melhoresSagas.forEach(function () {
      const cardTwo = document.createElement("div");
      cardTwo.className = "card";

      const img = document.createElement("img");
      img.src = melhoresSagas[index];
      img.alt = melhoresSagas[index];

      cardTwo.appendChild(img);
      cardContainerTwo.appendChild(cardTwo);
      sagas_two.appendChild(cardContainerTwo);
      index++;
    });

    dados.produtosCardsArray.forEach(function (data) {
      const a = document.createElement("a");
      a.textContent = data.a;

      footerProduto.appendChild(a);
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
    if (dados) {
      //asdsd
      cardBeastFilms.style.backgroundImage = `url(${dados.filmesCard[0].src})`;
      //ssasd
      setInterval(headerFunction, 2000);
      cardBeastFilmsContent();
      content();
    } else {
      alert("Error");
    }
  } catch (erro) {
    console.error("Erro ao carregar o JSON", erro);
  }
}
/*setInterval(cardBeastFilmsContent, 3000); */
