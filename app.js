import { createRandom } from "./createRandom.js";

// Timer
//
let startGame = false;
var sec = 0;
let first = 0;
let pair = 0;
let moves = 0;
let original = "";
let myTimer;

function pad(val) {
  return val > 9 ? val : "0" + val;
}

$("#start").on("click", function () {
  startGame = true;
  myTimer = setInterval(function () {
    $("#seconds").html(pad(++sec % 60));
    $("#minutes").html(pad(parseInt(sec / 60)));
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
      pair++;
      first = 0;
    } else {
      setTimeout(function () {
        $(original).css("display", "none");
        $(original).siblings().css("display", "block");
        $(pcard).css("display", "none");
        $(blankCard).css("display", "block");
      }, 1000);
      first = 0;
    }

    if (pair == 8) {
      clearInterval(myTimer);
      startGame = false;
      setTimeout(function () {
        $("#seconds").html("00");
        $("#minutes").html("00");
        pair = 0;
        moves = 0;
        $("#moves").html(moves);
        createRandom();
      }, 2000);
    }
  }
});
