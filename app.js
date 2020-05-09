'use strict';

// create Links to DOM elements
var container = document.getElementById('itemContainer');
var img1 = document.getElementById('product1');
var img2 = document.getElementById('product2');
var img3 = document.getElementById('product3');
var listEl = document.getElementById('list');
var main = document.getElementById('main');
var footer = document.getElementById('footer');


var productsArray = [];
var clickCounter = 25;


// Constructor Function
function Product(name, src, shown = 0, clicked = 0) {
  this.name = name;
  this.src = src;
  this.shown = shown;
  this.clicked = clicked;
  productsArray.push(this);
}


// Save to local storage
function saveLocalStorage() {
  var savedProducts = JSON.stringify(productsArray);
  localStorage.setItem('Products', savedProducts);
}


// Load Storage if there was any data
function loadLocalStorage() {
  // check to see if there's stuff in local storage
  // if there is, then we grab it and use the data
  // if local storage is empty, proceed as its the first time
  if (localStorage.getItem('Products')) {
    var localStorageProducts = JSON.parse(localStorage.getItem('Products'));
    for (var i = 0; i < localStorageProducts.length; i++) {
      new Product(localStorageProducts[i].name, localStorageProducts[i].src, localStorageProducts[i].shown, localStorageProducts[i].clicked);
    }
  }
  else {
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
  }
  imageGeneratorV2();
}




function randomizer(max) {
  return Math.floor(Math.random() * max);
}


var previouslySelected = [];

// Generate Images
function imageGeneratorV2() {
  do {
    var pic1 = randomizer(productsArray.length);
    var pic2 = randomizer(productsArray.length);
    var pic3 = randomizer(productsArray.length);
  } while (previouslySelected.includes(pic1) || previouslySelected.includes(pic2) || previouslySelected.includes(pic3) || pic1 === pic2 || pic1 === pic3 || pic2 === pic3);

  img1.src = productsArray[pic1].src;
  img1.title = productsArray[pic1].name;
  productsArray[pic1].shown++;

  img2.src = productsArray[pic2].src;
  img2.title = productsArray[pic2].name;
  productsArray[pic2].shown++;

  img3.src = productsArray[pic3].src;
  img3.title = productsArray[pic3].name;
  productsArray[pic3].shown++;

  previouslySelected = [pic1, pic2, pic3];
}

// Generates List of Items clicked and viewed
function generateList() {
  for (var j = 0; j < productsArray.length; j++) {
    var listItem = document.createElement('li');
    listItem.textContent = `${productsArray[j].name.toUpperCase()} : ${productsArray[j].clicked} votes. Shown ${productsArray[j].shown} times`;
    listEl.appendChild(listItem);
  }
}


function stopClicking() {
  container.removeEventListener('click', handleClick);
  console.log('done');
}

// Function for Event Listener
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
    saveLocalStorage();
    main.textContent = '';
    footer.textContent = '';
    renderChart();
  }
  imageGeneratorV2();
}

// Add Event listener
container.addEventListener('click', handleClick);
loadLocalStorage();


// Seed Data
function getDataChart() {
  var namesArray = [];
  var clickedArray = [];
  var displayedArray = [];
  var clickedColorArray = [];
  var displayedColorArray = [];

  for (var i = 0; i < productsArray.length; i++) {
    namesArray.push(productsArray[i].name);
    clickedArray.push(productsArray[i].clicked);
    displayedArray.push(productsArray[i].shown);
    clickedColorArray.push('rgba(255, 99, 132, 0.2)');
    displayedColorArray.push('rgba(54, 162, 235, 0.2)');
  }
  return [namesArray, clickedArray, displayedArray, clickedColorArray, displayedColorArray];
}


// Renders Chart
function renderChart() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getDataChart()[0],
      datasets: [{
        label: '# of Clicks',
        data: getDataChart()[1],
        backgroundColor: getDataChart()[3],
        borderColor: getDataChart()[3],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: getDataChart()[2],
        backgroundColor: getDataChart()[4],
        borderColor: getDataChart()[4],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
