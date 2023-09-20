const LETTERS = [
    "A",
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  
  export const randomSlug = (): string => {
    var acc = [];
    for (var i = 0; i < 4; i++) {
      acc.push(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    }
    return acc.join("");
  };