let wordle = "earth".toUpperCase();
const tiledisplay = document.querySelector(".tile-container");
const msgdisplay = document.querySelector(".message-container");

const keydisplay = document.querySelector(".key-container");
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];

const matrix = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
let gameover = false;
let currentTile = 0;
let currentRow = 0;

matrix.forEach((row, row_index) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "matrix-row-" + row_index);
  rowElement.setAttribute("class", "matrix-row");
  tiledisplay.appendChild(rowElement);
  row.forEach((letter, letter_index) => {
    const rowitem = document.createElement("div");
    rowitem.setAttribute(
      "id",
      "matrix-row-" + row_index + "-item-" + letter_index
    );
    // rowitem.setAttribute("class", "tile");
    rowitem.classList.add('tile');
    rowElement.appendChild(rowitem);
  });
});

const buttonclick = (letter) => {
  if (letter === "<<") {
    if (currentTile > 0) deleteLetter();
  } else if (letter === "ENTER") {
    enter();
  } else {
    if (currentTile < 5 && currentRow < 6) addLetter(letter);
  }
};

const addLetter = (letter) => {
  const tile = document.getElementById(
    "matrix-row-" + currentRow + "-item-" + currentTile
  );
  tile.setAttribute("data", letter);
  matrix[currentRow][currentTile] = letter;
  tile.innerHTML = letter;
  currentTile++;
};

const deleteLetter = () => {
  currentTile--;
  const tile = document.getElementById(
    "matrix-row-" + currentRow + "-item-" + currentTile
  );
  matrix[currentRow][currentTile] = "";
  tile.innerHTML = "";
  tile.removeAttribute("data");
  //   tile.setAttribute('data','');
  console.log(matrix);
};

const enter = () => {
  if (currentTile === 5) {
    const guess = matrix[currentRow].join("");
    if (guess == wordle.toUpperCase()) {
      gameover = true;
      message();
      assignColor(); //assign color

      return;
    } else {
      console.log("losser");
      if (currentRow >= 5) {
        gameover = false;
        message();
        console.log("losser");
        assignColor(); //assign color
      }
      if (currentRow < 6) {
        assignColor(); //assign color

        currentTile = 0;
        currentRow++;
      }
    }

    console.log(guess);
  }
};
const message = () => {
  if (gameover == true) {
    msgdisplay.innerHTML = "success";
  } else {
    msgdisplay.innerHTML = "looser";
  }
};

keys.forEach((key) => {
  const keybutton = document.createElement("button");
  keybutton.setAttribute("id", key);
  keybutton.classList.add('keyboard-key');

  keybutton.textContent = key;
  keybutton.addEventListener("click", () => buttonclick(key));
  keydisplay.appendChild(keybutton);
});

const assignColor = () => {
    const keys=document.getElementsByClassName('keyboard-key');
  matrix[currentRow].forEach((tile, row_index) => {
    const ctile = document.getElementById(
      "matrix-row-" + currentRow + "-item-" + row_index
    );
    if (wordle.includes(ctile.getAttribute("data"))) {
      if (wordle[row_index] == matrix[currentRow][row_index]) {
        ctile.classList.add("tile-green");
        // keys.getElementById(matrix[currentRow][row_index]).classList.add('tile-green');
        // console.log(keys.find((x) => x.id == matrix[currentRow][row_index]));
    console.log(keys);  
    } else {
        ctile.classList.add("tile-yellow");
      }
    } else {
      ctile.classList.add("tile-grey");
    }
  });
};
