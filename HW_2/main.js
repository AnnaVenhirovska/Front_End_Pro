// First task

function getNumber() {
  let firstNumber, 
      secondNumber;

  do {
    firstNumber = parseInt(prompt("Enter a number, a", ""));
  } while (isNaN(firstNumber));
  do {
    secondNumber = parseInt(prompt("Enter a number greater than the previous one, b", ""));
  } while (isNaN(secondNumber));

  for (let i = firstNumber; i <= secondNumber; i++) {
    if (i % 2 === 0) {
      console.log(i ** 2);
    }
  }
}

getNumber();

// ----------------------------------------------------------------

// Second task

function getOnlyNumber() {
    let num;
  
    while (true) {
      let input = prompt("Enter a number", ""),
          enterNumber = Number(input);
  
      if (Number.isNaN(enterNumber) || input === "") {
        continue;
      }
  
      num = enterNumber;
      break;
    }
  
    console.log("You have entered a number");
  }
  
  getOnlyNumber();
  
// -----------------------------------------------------------------

// Third task

const insertNumber = parseInt(prompt("Enter a number", '')),
      notPrimeNum = "isn't a prime number";

if (insertNumber <= 1) {
  console.log(`${insertNumber}` + " " + notPrimeNum);
} else if (isNaN(insertNumber)) {
  console.log("Please enter a number =)");
}
for (let i = 2; i <= insertNumber; i++) {
  if (insertNumber % i === 0) {
    if (i === insertNumber) {
      console.log(`${insertNumber} is a prime number`);
    } else {
      console.log(`${insertNumber}` + " " + notPrimeNum);
      break;
    }
  }
}

// ----------------------------------------------------------------

// Fourth task

let primeNum,
    sum = 0;

for (let i = 2; i <= 250; i++) {
  primeNum = true;

  for (let f = 2; f < i; f++) {
    if (i % f === 0) {
      primeNum = false;
    }
  }

  if (primeNum) {
    sum += i;
  }
}

console.log(`The sum of prime numbers from 0 to 250 is ${sum}`);