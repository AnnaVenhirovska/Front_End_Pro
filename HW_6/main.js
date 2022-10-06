let list = [1, 2, 3, 4, 5];

function copy(list, newFunction) {
  let copyList = [];

  if (typeof newFunction === "function") {
    for (let i = 0; i < list.length; i++) {
      copyList.push(newFunction(list[i]));
    }
  } else {
    for (let i = 0; i < list.length; i++) {
      copyList.push(list[i]);
    }
  }
  return copyList;
}

const newL = copy(list, function (value) {
  return value * 10;
});

console.log(list);
console.log(newL);