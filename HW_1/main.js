const cylinderRadius = +prompt ("Введите радиус", ''),
      cylinderHeight = +prompt ("Введите высоту", ''),
      cylinderBase = (Math.PI.toFixed([2]) * cylinderRadius ** 2),
      сylinderVolume = cylinderBase * cylinderHeight;

document.write("<p>**************</p><p>Обьем цилиндра с площадью основы" + ' ', cylinderBase + ", радиусом" + ' ', cylinderRadius, ' ' + "и высотой" + ' ', cylinderHeight, ' ' + "равен:</p><p>--------------------</p><p>V =" + ' ', сylinderVolume + ".</p><p>-------------------</p><p>end.</p>");



const enterNumber = "Enter variable",
      varFirst = +prompt (`${enterNumber} a`, ''),
      varSecond = +prompt (`${enterNumber} b`, ''),
      varThird = +prompt (`${enterNumber} c`, ''),
      resultVariable = varFirst + varSecond + varThird;

document.write(`${varFirst} + ${varSecond} + ${varThird} = ${resultVariable}`);

function isEvenNumCheck(value) { 
    if (value % 2 === 0) {
        document.write ("<p>Чётная переменная:" + ' ', + value + ".</p>");
    } else {
        document.write ("");
    }
}

isEvenNumCheck(varFirst);
isEvenNumCheck(varSecond);
isEvenNumCheck(varThird);