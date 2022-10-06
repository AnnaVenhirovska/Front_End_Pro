// First task

const A = new Array(21),
      B = new Array(),
      d = 451;

for (i = 0; i < A.length; i++) {
  A[i] = Math.floor(Math.random() * d);

  n = A[i];

  if (n < 2) {
    continue;
  }

  isPrime = true;
  for (j = 2; j < n; j++) {
    if (n % j == 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    B.push(n);
  }
}

console.log(A);
console.log("Простые числа из массива А", B);
 
max = A[0];
min = A[0];

for (i = 1; i < A.length; i++) {
  if (A[i] > max) {
    max = A[i];
  }

  if (A[i] < min) {
    min = A[i];
  }
}

console.log(min, "минимальное число");
console.log(max, "максимальное число");

// -----------------------------------

// Second task

let A = [1, 5, 6, 2, 4],
    lengthA = A.length;

for (i = A.length - 1; i >= 0; i--) {
  A.push(A[i]);
}

A.splice(0, lengthA);

console.log(A);

// -----------------------------------

// Third task

const A = new Array(15),
      B = new Array(15),
      n = 25;

for (i = 0; i < A.length; i++) {
    A[i] = Math.floor(Math.random() * n);
}
      
for (j = 0; j < B.length; j++) {
    B[j] = Math.floor(Math.random() * n);
}

console.log(A);
console.log(B);

const duplicated = A.filter(element => B.includes(element));

console.log(duplicated);

// -------------------------------

// Fourth task

let A = [1, 2, 3, 4, 5, 6, 7];

for (i = 0; i < A.length - 1; i += 2) {
  let c = A[i];
  A[i] = A[i + 1];
  A[i + 1] = c;
}

console.log(A);