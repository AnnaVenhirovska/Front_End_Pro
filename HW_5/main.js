var A = [15, 15, 100],
    B = [100, 100, 100];

function sumComparison(arrayA, arrayB) {
  function receiveSum(array) {
    var sum = 0;
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] === "number") {
        sum += array[i];
      }
    }
    return sum;
  }
  var sumA = receiveSum(arrayA),
      sumB = receiveSum(arrayB);

  if (sumA > sumB) {
    return arrayA;
  } else {
    return arrayB;
  }
}

console.log(sumComparison(A, B));