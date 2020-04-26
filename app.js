'use strict';

// create Links to DOM elements
var container = document.getElementById('itemContainer');
var img1 = document.getElementById('product1');
var img2 = document.getElementById('product2');
var img3 = document.getElementById('product3');
var listEl = document.getElementById('list');

var productsArray = [];
var clickCounter = 25;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.shown = 0;
  this.clicked = 0;
  productsArray.push(this);
}

new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pen', './img/pen.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('usb', './img/usb.gif');
new Product('water-can', './img/water-can.jpg');
new Product('wine-glass', './img/wine-glass.jpg');


function randomizer(max) {
  return Math.floor(Math.random() * max);
}

function imageGenerator() {
  var pic1 = randomizer(productsArray.length);
  var pic2 = randomizer(productsArray.length);
  var pic3 = randomizer(productsArray.length);

  while (pic1 === pic2) {
    pic2 = randomizer(productsArray.length);
  }
  while (pic2 === pic3 || pic1 === pic3) {
    pic3 = randomizer(productsArray.length);
  }
  console.log(pic1, pic2, pic3);

  img1.src = productsArray[pic1].src;
  img1.title = productsArray[pic1].name;

  img2.src = productsArray[pic2].src;
  img2.title = productsArray[pic2].name;

  img3.src = productsArray[pic3].src;
  img3.title = productsArray[pic3].name;
}

function generateList() {
  for (var j = 0; j < productsArray.length; j++) {
    var listItem = document.createElement('li');
    listItem.textContent = `${productsArray[j].name.toUpperCase()} : ${productsArray[j].clicked} votes`;
    listEl.appendChild(listItem);
    console.log(listItem);
  }
}

function stopClicking() {
  container.removeEventListener('click', handleClick);
  console.log('done');
}

function handleClick(event) {
  var clickedProduct = event.target.title;
  for (var i = 0; i < productsArray.length; i++) {
    if (clickedProduct === productsArray[i].name) {
      productsArray[i].clicked++;
    }
  }
  clickCounter--;
  if (clickCounter === 0) {
    stopClicking();
    generateList();
  }
  imageGenerator();
}

container.addEventListener('click', handleClick);

imageGenerator();

