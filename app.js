import { createRandom } from "./createRandom.js";

// Timer
//
let startGame = false;
var count = 60;
let first = 0;
let pair = 0;
let moves = 0;
let original = "";
let myTimer;

let match = new Audio("./sounds/match.ogg"),
  win = new Audio("./sounds/win.ogg"),
  wrong = new Audio("./sounds/wrong.ogg"),
  lost = new Audio("./sounds/lost.ogg");

$("#start").on("click", function () {
  startGame = true;
  myTimer = setInterval(function () {
    $("#seconds").html(count--);
    if (count == 0) {
      lost.play();
      $("#seconds").html("00");
      $("#info").append("<h4>YOU LOST</h4>");
      clearInterval(myTimer);
      setTimeout(function () {
        pair = 0;
        moves = 0;
        $("#moves").html(moves);
        startGame = false;
        $("#info").html("");
        createRandom();
      }, 5000);
    }
  }, 1000);
});

createRandom();

$("#mainBox").on("click", ".blankCard", function () {
  if (startGame) {
    moves++;
    $("#moves").html(moves);
    let pcard = $(this).siblings();
    let blankCard = $(this);
    $(pcard).css("display", "block");
    $(pcard).css("animation", "fadeIn 1s");
    $(blankCard).css("display", "none");

    let value = $(pcard).attr("value");
    if (first == 0) {
      first = value;
      original = $(pcard);
    } else if (first == value) {
      match.play();
      pair++;
      first = 0;
    } else {
      wrong.play();
      setTimeout(function () {
        $(original).css("display", "none");
        $(original).siblings().css("display", "block");
        $(pcard).css("display", "none");
        $(blankCard).css("display", "block");
      }, 1000);
      first = 0;
    }

    if (pair == 8) {
      win.play();
      $("#info").append(`<h4>Score:</h4><span>${moves}</span>`);
      clearInterval(myTimer);
      startGame = false;
      setTimeout(function () {
        pair = 0;
        moves = 0;
        $("#moves").html(moves);
        $("#info").html("");
        $("#seconds").html("00");
        createRandom();
      }, 5000);
    }
  }
});
