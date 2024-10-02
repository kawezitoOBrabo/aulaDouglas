const buttonNav = document.querySelector("nav button");
const iButtonNav = document.querySelector("nav button i");
const header = document.querySelector("header");
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

    let isClick = false
    buttonNav.addEventListener("click", function () {
      isClick = !isClick;
      if(isClick){
        header.classList.add("active");
        iButtonNav.className = "fas fa-times";
        buttonNav.classList.add("rotate"); 
      } else {
        header.classList.remove("active");
        iButtonNav.className =  "fas fa-solid fa-bars";
        buttonNav.classList.remove("rotate");
      }
    });
  } else {
    alert("dados ainda não carregados!");
  }
}
let indexCa = 0;
async function carregarDadosFooter() {
  try {
    const resposta = await fetch("../data.json");
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
