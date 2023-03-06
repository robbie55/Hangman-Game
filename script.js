const array = [...Array(26)];
let catArr = [
  {
    category: "Animals",
    words: [
      "zebra",
      "lion",
      "giraffe",
      "frog",
      "lizard",
      "bird",
      "elephant",
      "dog",
      "cat",
      "snake",
      "penguin",
      "duck",
      "tiger",
      "monkey",
      "fox",
      "wolf",
      "panda",
      "gorilla",
      "hippo",
      "fish",
    ],
    hints: [
      "black and white",
      "king of the jungle",
      "long neck",
      "amphibian",
      "green with a tail",
      "government drones",
      "big with a trunk",
      "mans best friend",
      "not a dog",
      "slither",
      "happy feet",
      "hunting season",
      "striped lion",
      "where we came from",
      "red dog kinda",
      "dog before dog",
      "bamboo",
      "huge, strong monkey",
      "looks can be decieving, thats the best hint I got",
      "the water animal",
    ],
  },
  {
    category: "Cod Zombies",
    words: [
      "ray gun",
      "origins",
      "george romero",
      "der eisendrache",
      "apothicon",
      "ice staff",
      "fire staff",
      "wind staff",
      "lightning staff",
      "nacht der untoten",
      "kino der toten",
      "ray gun mark two",
      "buried",
      "leeroy jenkins",
      "shangri la",
      "moon",
      "gersch device",
      "monkey bomb",
      "pack a punch",
      "wall buy",
    ],
    hints: [
      "first wonder weapon",
      "greatest map of all time",
      "why call of the dead sucks",
      "bo3 origins",
      "antagonist of bo3 storyline",
      "most mainstream weapon on origins",
      "great for panzers",
      "chad pick",
      "worst staff",
      "where it all began",
      "where it became great",
      "better ray gun",
      "chalk and candy",
      "greatest adversary on buried",
      "hardest easter egg up until bo4",
      "blow up the earth",
      "black hole",
      "such a classic, the first tactical",
      "introduced in der riese",
      "great concept for weapons",
    ],
  },
  {
    category: "One Piece",
    words: [
      "luffy",
      "sanji",
      "nami",
      "zoro",
      "whitebeard",
      "blackbeard",
      "rocks xebec",
      "jimbei",
      "mihawk",
      "boa hancock",
      "garp",
      "akainu",
      "aokiji",
      "dragon",
      "ace",
      "gol d roger",
      "sabo",
      "momonosuku",
      "big mom",
      "shanks",
    ],
    hints: [
      "mugiwaraaaa",
      "nami swannn",
      "luffys navigator",
      "three sword style",
      "the one piece is real",
      "two fruits, one body",
      "captain of the yonko",
      "warlord and fish man",
      "greatest swordsmen",
      "luffys potential love interest",
      "admiral along side sengoku, took down roger",
      "current fleet admiral, donut machine",
      "coolest admiral, literally",
      "an enigma of the revolutionaries",
      "rip my man",
      "greatest pirate ever",
      "dragon claw",
      "shogun of wano",
      "weirdest yonko for sure",
      "another enigma but with red hair",
    ],
  },
  {
    category: "Jiu Jitsu",
    words: [
      "Gordon Ryan",
      "John Danaher",
      "kimono",
      "nogi",
      "triangle",
      "armbar",
      "leg lock",
      "heel hook",
      "blue belt",
      "purple belt",
      "rear naked strangle",
      "rubber guard",
      "butterfly guard",
      "andre galvao",
      "closed guard",
      "half guard",
      "mount",
      "side control",
      "back control",
      "north south",
    ],
    hints: [
      "greatest to do it",
      "that slow, silky voice",
      "traditionlist, yuck",
      "most popular form",
      "most versatile sub, strangle and arm locks from everywhere",
      "classic, everyone knows this joint lock",
      "brazillians hate it, dudes in spats love it",
      "most devastating joint lock",
      "don't quit now, you just got started",
      "I can skip warm ups now right?",
      "most sound sub, no powering through this",
      "say goodbye to your knees guard",
      "best guard, sorry not sorry",
      "one of the greats, most ADCC wins",
      "first guard you'll ever learn",
      "foundational nogi guard",
      "best chest to chest pin",
      "where are my big guys",
      "most dominant position in jiu jitsu",
      "a nice transitional pin",
    ],
  },
];

let alphabet;
let chosenCategory;
let chosenWord;
let chosenHint;
let gameID = false;
let guessCnt = 10;
let gameArr;
let hintShown = false;
let btnsPushed = [];
const body = document.querySelector("body");
const letters = document.querySelector(".letters");
const letters1 = document.querySelector(".letters1");
const letters2 = document.querySelector(".letters2");
const leftTrophy = document.querySelector(".leftTrophy");
const rightTrophy = document.querySelector(".rightTrophy");
const game = document.querySelector(".game");
const guesses = document.querySelector(".guesses");
const categoryEl = document.querySelector(".category");
const startBtn = document.querySelector(".startBtn");
const hintBtn = document.querySelector(".hintBtn");
const hint = document.querySelector(".hint");
const gameContainer = document.querySelector(".gameContainer");

const generateAlphabet = function (alphabetArr) {
  alphabet = alphabetArr.map((_, i) => String.fromCharCode(i + 97));
  alphabet.forEach((letter, i) => {
    const html = `<span class="letter">${letter.toUpperCase()}</span>`;
    if (i >= 13) {
      letters2.insertAdjacentHTML("beforeend", html);
    }
    if (i < 13) {
      letters1.insertAdjacentHTML("beforeend", html);
    }
  });
};
generateAlphabet(array);

letters.addEventListener("click", (e) => {
  const btnPush = e.target;
  btnsPushed.push(btnPush);
  if (!btnPush.classList.contains("letter") || !gameID) return;
  guessed(e.target.innerHTML, btnPush);
});

startBtn.addEventListener("click", () => {
  reset();
  startGame();
});

const startGame = function () {
  gameID = true;
  startBtn.innerHTML = "Reset";
  catArr.forEach((obj) => {
    obj.words = obj.words.map((word) => word.toUpperCase());
  });
  const num = Math.trunc(Math.random() * 4);
  const num2 = Math.trunc(Math.random() * 20);
  chosenCategory = catArr[num];
  chosenWord = chosenCategory.words[num2];
  chosenHint = chosenCategory.hints[num2];
  hintHandler();
  handleGame();
};

const handleGame = function () {
  categoryEl.innerHTML = `The category for this game is ${chosenCategory.category}`;
  gameArr = [...chosenWord].map((val) =>
    val === " "
      ? { hidden: "&nbsp;&nbsp;&nbsp;", true: " " }
      : { hidden: "_", true: val }
  );
  guessUIHandler();

  console.log(chosenWord);
};

const guessed = function (letter, btnPush) {
  if (chosenWord.includes(letter)) {
    btnsPushed[btnsPushed.indexOf(btnPush)].style.backgroundColor =
      "rgb(255, 255, 143)";
    guessUIHandler(letter);
  } else {
    guessCnt--;
    btnsPushed[btnsPushed.indexOf(btnPush)].style.backgroundColor =
      "rgba(245, 245, 245, 0.5)";
    guesses.innerHTML = `You have ${guessCnt} guesses left`;
  }
  winLossHandler();
};

const guessUIHandler = function (guessed = "") {
  let gameStr = "";
  gameArr.forEach((val, i) => {
    if (guessed === val.true) {
      val.hidden = val.true;
    }
    gameStr += `${val.hidden} `;

    game.innerHTML = gameStr;
  });
};

const winLossHandler = function () {
  const winLoss = gameArr.every(
    (val) => val.hidden === val.true || val.hidden === "&nbsp;&nbsp;&nbsp;"
  );
  if (guessCnt > 0 && !winLoss) return;
  if (guessCnt === 0) {
    winLossUI("lost");
  }
  if (winLoss) {
    winLossUI("won");
  }
  gameID = false;
};

const winLossUI = function (key) {
  if (key === "lost") {
    body.style.backgroundColor = "red";
    startBtn.classList.remove("win");
    startBtn.classList.add("loss");
  }
  if (key === "won") {
    leftTrophy.style.opacity = "1";
    rightTrophy.style.opacity = "1";
  }
  startBtn.style.fontSize = "0.8rem";
  startBtn.innerHTML = "Play Again";
  categoryEl.innerHTML = `You ${key}!!`;
};

const reset = function () {
  hintShown = false;
  guessCnt = 10;
  guesses.innerHTML = `You have ${guessCnt} guesses left`;
  body.style.backgroundColor = "#74B72E";
  leftTrophy.style.opacity = "0";
  rightTrophy.style.opacity = "0";
  hint.style.opacity = "0";
  startBtn.classList.add("win");
  startBtn.classList.remove("loss");
  startBtn.style.fontSize = "1.2rem";
  startBtn.innerHTML = "Play";
  btnsPushed.forEach(
    (btn) => (btn.style.backgroundColor = "rgba(245, 245, 245, 1)")
  );
};

const hintHandler = function () {
  hintBtn.style.opacity = 1;
  hintBtn.addEventListener("click", () => {
    if (hintShown) return;
    hintBtn.style.opacity = 0;
    hint.innerHTML = chosenHint;
    hint.style.opacity = 1;
    hintShown = true;
  });
};
