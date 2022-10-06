document.write("<p>Оригинальный массив:</p>");

const n = 10,
      m = 10,
      A = new Array(n);

for (i = 0; i < A.length; i++) {
  A[i] = new Array(m);
  for (j = 0; j < A[i].length; j++) {
    A[i][j] = Math.floor(Math.random() * 41) - 20;
    document.write(A[i][j] + " ");
  }
  document.write("<br />");
}

document.write("<p>Массив где сумма элементов столбца < 0:</p>");

for (i = 0; i < m; i++) {
  sum = 0;
  for (j = 0; j < n; j++) {
    sum += A[j][i];
  }
  if (sum < 0) {
    for (j = 0; j < n; j++) {
      delete A[j][i];
    }
  }
  console.log("Сумма колонки " + i, sum);
}

for (i = 0; i < A.length; i++) {
  for (j = 0; j < A[i].length; j++) {
    if (typeof A[i][j] !== "undefined") {
      document.write(A[i][j] + " ");
    }
  }
  document.write("<br />");
}