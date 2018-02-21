// -------------------
const app = function () {
  const url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete);

  if (localStorage.getItem('beer')) {
    const jsonString = localStorage.getItem('beer');
    const savedBeer = JSON.parse(jsonString);

    const beerSelect = document.getElementById("beer-list")

    displayBeerInfo(savedBeer);
  };
};
// -------------------

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

const requestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers);
};
// -------------------
const populateList = function (beers) {
  const select = document.getElementById("beer-list");
  beers.forEach(function (beer, index) {
    const option = document.createElement("option");
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
 });

 select.addEventListener('change', function(){
   getBeer(beers);
 });

};
// -------------------
const getBeer = function (beers) {
  const index = document.getElementById('beer-list').value;
  const beer = beers[index];
  beer.index = index;
  const jsonString = JSON.stringify(beer);
  localStorage.setItem('beer', jsonString);
  displayBeerInfo(beer);
};

const displayBeerInfo = function (beer) {
  createImage(beer);
  const infoDiv = document.getElementById('beer-info');
  infoDiv.innerHTML = '';
  const name = createBeerName(beer);
  infoDiv.appendChild(name);
  const ingredients = displayIngredients(beer);
};

const createImage = function (beer) {
  const imageDiv = document.getElementById('beer-image');
  imageDiv.innerHTML = '';
  const img = document.createElement('img');
  img.src = beer.image_url;
  imageDiv.appendChild(img);
};

const createBeerName = function (beer) {
  const h2 = document.createElement('h2');
  h2.innerText = beer.name;
  return h2;
};

const displayIngredients = function (beer) {
  const infoDiv = document.getElementById('beer-info');

  // malt info
  const malt = document.createElement('h3');
  malt.innerText = 'Malt:'
  const maltList = document.createElement('ul');
  beer.ingredients.malt.forEach(function(ingredient) {
    const maltLi = document.createElement('li');
    maltLi.innerText = `${ingredient.name}, ${ingredient.amount.value} ${ingredient.amount.unit}`
    maltList.appendChild(maltLi);
  });
  infoDiv.appendChild(malt);
  infoDiv.appendChild(maltList);

  // hops info
  const hops = document.createElement('h3');
  hops.innerText = 'Hops:'
  const hopsList = document.createElement('ul');
  beer.ingredients.hops.forEach(function(ingredient) {
    const hopsLi = document.createElement('li');
    hopsLi.innerText = `${ingredient.name} ${ingredient.amount.value} ${ingredient.amount.unit} \n Add: ${ingredient.add} \n Attribute: ${ingredient.attribute}`
    hopsList.appendChild(hopsLi);
  });
  infoDiv.appendChild(hops);
  infoDiv.appendChild(hopsList);

  // yeast info
  const yeast = document.createElement('h3');
  yeast.innerText = 'Yeast:'
  const yeastList = document.createElement('ul');
  const yeastLi = document.createElement('li');
  yeastLi.innerText = beer.ingredients.yeast
  yeastList.appendChild(yeastLi);
  infoDiv.appendChild(yeast);
  infoDiv.appendChild(yeastLi);
}

document.addEventListener('DOMContentLoaded', app);
