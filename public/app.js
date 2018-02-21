// -------------------
const app = function () {
  const url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete);
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

const createRow = function (beer) {
  const table = document.getElementById("beer-list");
  const row = document.createElement('tr')
  table.appendChild(row);
  const imgtd = document.createElement('td');
  const img = createImage(beer);
  img.width="50";
  imgtd.appendChild(img);
  const td = document.createElement('td');
  td.innerText = beer.name;
  row.appendChild(imgtd);
  row.appendChild(td);
  return row;
}

const createImage = function (beer) {
  const img = document.createElement('img');
  img.width = '50px';
  img.src = beer.image_url;
  return img;
};

const populateList = function (beers) {
  beers.forEach(function (beer) {
    createRow(beer);
 });
};

document.addEventListener('DOMContentLoaded', app);
