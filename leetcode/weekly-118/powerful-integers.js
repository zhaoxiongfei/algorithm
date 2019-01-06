//
/**
 * @param {number} x
 * @param {number} y
 * @param {number} bound
 * @return {number[]}
 */
const powerfulIntegers = (x, y, bound) => {
  let i = 0;
  let j = 0;
  const ans = new Set();

  if (x !== 1) {
    while (x ** i + y ** j <= bound) i += 1;
  } else {
    i = 1;
  }

  const maxI = i;
  i = 0;
  if (y !== 1) {
    while (x ** i + y ** j <= bound) j += 1;
  } else {
    j = 1;
  }
  const maxJ = j;

  for (i = 0; i < maxI; i += 1) {
    for (j = 0; j < maxJ; j += 1) {
      if (x ** i + y ** j <= bound) {
        ans.add(x ** i + y ** j);
      }
    }
  }

  return Array.from(ans);
};

console.log(powerfulIntegers(1, 2, 100));
console.log(powerfulIntegers(2, 3, 10));
console.log(powerfulIntegers(3, 5, 15));
