let myCards = document.querySelector(".wrapper .cardContent");
let resultsArray = [];
let counter = 0;
let text = document.querySelector("p");
let seconds = 00;
let tens = 00;
let appendTens = document.querySelector(".wrapper .tens");
let appendSeconds = document.querySelector(".wrapper .seconds");
let Interval;

let lvCounter = 0;
let images = [];
let level = document.querySelector(".wrapper .level").innerHTML;
const myButton = document.querySelector("button");
let nextButton = document.querySelector(".btnNextLevel");
nextButton.style.visibility = "hidden";

function loadpage() {
  let imageLoad = document.querySelector(".wrapper .level").innerHTML * 2;
  lvCounter = imageLoad;
  images = [];

  console.log(imageLoad);

  console.log(imageLoad);
  for (let i = 0; i < imageLoad; i++) {
    let j = i + 1;
    images.push("card" + j);
  }

  myCards.innerHTML = "";

  let clone = images.slice(0); // duplicate array
  let cards = images.concat(clone); // merge to arrays
  shuffle(cards);

  console.log(cards);

  for (let i = 0; i < cards.length; i++) {
    card = document.createElement("div");
    card.dataset.item = cards[i];
    card.dataset.view = "card";
    myCards.appendChild(card);

    card.onclick = function () {
      if (this.className != "flipped" && this.className != "correct") {
        this.className = "flipped";
        let result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        nextButton.style.visibility = "hidden";
      }
      if (resultsArray.length > 1) {
        if (resultsArray[0] === resultsArray[1]) {
          check("correct");
          counter++;
          win();
          resultsArray = [];
        } else {
          check("reverse");
          resultsArray = [];
        }
      }
    };
  }
}

loadpage();

// Shufffel function
function shuffle(o) {
  for (
    let j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

let check = function (className) {
  let x = document.getElementsByClassName("flipped");
  setTimeout(function () {
    for (let i = x.length - 1; i >= 0; i--) {
      x[i].className = className;
    }
  }, 500);
};

let win = function () {
  if (counter === lvCounter) {
    clearInterval(Interval);
    text.innerHTML = "Your time was " + seconds + ":" + tens;

    if (document.querySelector(".wrapper .level").innerHTML < 5) {
      nextButton.style.visibility = "";
    } else {
      text.innerHTML = "Congrats, You have completed the game";
    }
  }
};

function startTimer() {
  tens++;

  if (tens < 9) {
    document.querySelector(".wrapper .tens").innerHTML = "0" + tens;
  }

  if (tens > 9) {
    document.querySelector(".wrapper .tens").innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    document.querySelector(".wrapper .seconds").innerHTML = "0" + seconds;
    tens = 0;
    document.querySelector(".wrapper .tens").innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    document.querySelector(".wrapper .seconds").innerHTML = seconds;
  }
}

//myButton.addEventListener("click", onClick);

function onClick() {
  counter = 0;
  seconds = 00;
  tens = 00;
  document.querySelector("p").innerHTML =
    "<span class='seconds' id='seconds'>00</span>:<span class='tens' id='tens'>00</span>";
  level = parseInt(level) + 1;
  document.querySelector(".wrapper .level").innerHTML = level;
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
  check("reverse");
  loadpage();
  resultsArray = [];
  nextButton.style.visibility = "hidden";
}
