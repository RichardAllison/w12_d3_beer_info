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

const createListItem = function (beer) {
  const li = document.createElement('li');
  li.innerText = beer.name;
  return li;
};

const appendListItem = function (li) {
  const ul = document.getElementById("beer-list");
  ul.appendChild(li);
};

const populateList = function (beers) {
  beers.forEach(function (beer) {
   const li = createListItem(beer);
   appendListItem(li);
 });
};

document.addEventListener('DOMContentLoaded', app);
