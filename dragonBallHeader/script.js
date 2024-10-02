const buttonNav = document.querySelector("nav button");
const iButtonNav = document.querySelector("nav button i");
const header = document.querySelector("header");
const navegation = document.querySelector(".navegation");
const footerFilms = document.querySelector(".footer_films");
const footerSeries = document.querySelector(".footer_series");
const footerProduto = document.querySelector(".footer_produto");

let dados = null;

let index = 0;

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

function divirtaSeContent() {
  if (dados) {
    //divirta-se aqui
    const cards_content_main = document.querySelector(".cards_content_main");
    const cards_beast = document.querySelector(".cards_beast");
    //Card => divirta-se aqui
    dados.homePage.forEach(function (homePageItem) {
      homePageItem.materialIcons.forEach(function (icon) {
        const card = document.createElement("div");
        card.className = "card";

        const i = document.createElement("i");
        i.className = "material-icons";
        i.textContent = icon;

        const h1 = document.createElement("h1");
        h1.textContent = homePageItem.cardsH1[index];

        const p = document.createElement("p");
        p.textContent =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit" +
          "Necessitatibus sunt non laborum ratione sit sapiente deleniti" +
          "debitis incidunt consectetur voluptates tempore quod obcaecati" +
          "eligendi repudiandae, aliquid est accusantium modi cupiditate?";

        card.appendChild(i);
        card.appendChild(h1);
        card.appendChild(p);
        cards_content_main.appendChild(card);
        index++;
      });
    });
  } else {
    alert("dados ainda não carregados!");
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

    dados.produtosCardsArray.forEach(function (data) {
      const p = document.createElement("p");
      p.textContent = data.p;

      const a = document.createElement("a");
      a.textContent = p.textContent;

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
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    divirtaSeContent();
    content();
  } catch (erro) {
    console.error("Erro ao carregar o JSON", erro);
  }
}
