function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export function createRandom() {
  var cardImg = [];
  while (cardImg.length < 8) {
    var item = Math.floor(Math.random() * 10) + 1;
    if (cardImg.indexOf(item) === -1) cardImg.push(item);
  }

  cardImg.forEach((item) => cardImg.push(item));
  cardImg = shuffleArray(cardImg);
  let row = $("#mainBox").children().last();
  $(row).html("");
  cardImg.forEach((item) => {
    $(row).append(`
        <div class="col-md-3 col-sm-12">
          <div class="pCard" value=${item}>
            <img src="images/${item}.png" class="img-fluid" alt="" />
          </div>
          <div class="blankCard"></div>
        </div>

      `);
  });
  return cardImg;
}
