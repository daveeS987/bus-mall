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

//////     Version 1 of Image Generator    /////

// var pic1Previous;
// var pic2Previous;
// var pic3Previous;

// function imageGenerator() {
//   var pic1 = randomizer(productsArray.length);
//   var pic2 = randomizer(productsArray.length);
//   var pic3 = randomizer(productsArray.length);

//   while (pic1 === pic2 || pic1 === pic3 || pic1 === pic1Previous || pic1 === pic2Previous || pic1 === pic3Previous) {
//     pic1 = randomizer(productsArray.length);
//   }

//   while (pic2 === pic1 || pic2 === pic3 || pic2 === pic1Previous || pic2 === pic2Previous || pic2 === pic3Previous) {
//     pic2 = randomizer(productsArray.length);
//   }

//   while (pic3 === pic2 || pic3 === pic1 || pic3 === pic1Previous || pic3 === pic2Previous || pic3 === pic3Previous) {
//     pic3 = randomizer(productsArray.length);
//   }

//   img1.src = productsArray[pic1].src;
//   img1.title = productsArray[pic1].name;
//   productsArray[pic1].shown++;

//   img2.src = productsArray[pic2].src;
//   img2.title = productsArray[pic2].name;
//   productsArray[pic2].shown++;

//   img3.src = productsArray[pic3].src;
//   img3.title = productsArray[pic3].name;
//   productsArray[pic3].shown++;

//   pic1Previous = pic1;
//   pic2Previous = pic2;
//   pic3Previous = pic3;
// }

var generateArrayOfIndex = function () {
  var array = [];
  for (var i = 0; i < productsArray.length; i++) {
    array.push(i);
  }
  return array;
};
var arrayOfIndex = generateArrayOfIndex();

function imageGeneratorV2() {
  while (arrayOfIndex.length < 3) {
    arrayOfIndex = generateArrayOfIndex();
  }

  var index1 = randomizer(arrayOfIndex.length);
  var pic1 = arrayOfIndex[index1];
  arrayOfIndex.splice(index1, 1);

  var index2 = randomizer(arrayOfIndex.length);
  var pic2 = arrayOfIndex[index2];
  arrayOfIndex.splice(index2, 1);

  var index3 = randomizer(arrayOfIndex.length);
  var pic3 = arrayOfIndex[index3];
  arrayOfIndex.splice(index3, 1);

  img1.src = productsArray[pic1].src;
  img1.title = productsArray[pic1].name;
  productsArray[pic1].shown++;

  img2.src = productsArray[pic2].src;
  img2.title = productsArray[pic2].name;
  productsArray[pic2].shown++;

  img3.src = productsArray[pic3].src;
  img3.title = productsArray[pic3].name;
  productsArray[pic3].shown++;
}


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
    // container.textContent = '';
    main.textContent = '';
    footer.textContent = '';
    renderChart();
  }
  // imageGenerator();
  imageGeneratorV2();
}

container.addEventListener('click', handleClick);
// imageGenerator();
imageGeneratorV2();




// seed Data
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
