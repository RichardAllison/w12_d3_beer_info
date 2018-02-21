// -------------------
const app = function () {
  const url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete);

  if (localStorage.getItem('beer')) {
    const jsonString = localStorage.getItem('beer');
    const savedBeer = JSON.parse(jsonString);
    displayBeerInfo(savedBeer);
  }
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


const createImage = function (beer) {
  const imageDiv = document.getElementById('beer-image');
  imageDiv.innerHTML = ''
  const img = document.createElement('img');
  img.src = beer.image_url;
  // img.width = "50px";
  imageDiv.appendChild(img);
}

const getBeer = function (beers) {
  const index = document.getElementById('beer-list').value;
  const beer = beers[index];
  displayBeerInfo(beer);
}

const displayBeerInfo = function (beer) {
  createImage(beer);
  const infoDiv = document.getElementById('beer-info');
  infoDiv.innerHTML = ''
  const name = createBeerName(beer);
  infoDiv.appendChild(name);

  const jsonString = JSON.stringify(beer);
  localStorage.setItem('beer', jsonString);
}

const createBeerName = function (beer) {
  const h2 = document.createElement('h2');
  h2.innerText = beer.name;
  return h2;
}

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

document.addEventListener('DOMContentLoaded', app);
