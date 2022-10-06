function initialArray() {
  var list = compress([0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1]);
  function compress(list) {
    let count = 0;
    let compressedArray = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i] - list[i + 1] === 0) {
        count++;
      } else {
        count++;
        compressedArray.push(count);
        count = 0;
      }
    }
    return compressedArray;
  }
  console.log(list);
}
initialArray();