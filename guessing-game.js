const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let secretNumber;
let numAttempts;

const checkGuess = (n, arg) => {
  if (arg > n) {
    console.log("Too high.");
    return false;
  } else if (arg < n) {
    console.log("Too low.");
    return false;
  } else if (arg === n) {
    console.log("Correct!");
    return true;
  }
};

const askGuess = function() {
  console.log("\nAttempts remaining: " + numAttempts);

  rl.question("Enter a guess: ", input => {
    numAttempts--;
    let guess = checkGuess(secretNumber, Number(input));

    if (guess) {
      console.log("\nYou win!");
      rl.close();
    } else if (numAttempts === 0) {
      console.log("\nNo more attempts. You lose.");
      rl.close();
    } else {
      askGuess();
    }
  });
};

const randomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min) + min);
};

const askRange = () => {
  rl.question("Enter a max number: ", input => {
    let max = Number(input);

    rl.question("Enter a min number: ", input => {
      let min = Number(input);

      secretNumber = randomInRange(min, max);
      console.log(`I'm thinking of a number between ${min} and ${max}...`);

      askGuess();
    })
  })
};

const askLimit = () => {
  rl.question("Enter the limited number of attempts: ", limit => {
    numAttempts = Number(limit);
    askRange();
  });
};

askLimit();