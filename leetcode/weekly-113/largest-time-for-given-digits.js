// https://leetcode-cn.com/contest/weekly-contest-113/problems/largest-time-for-given-digits/

/**
 * @param {number[]} A
 * @return {string}
 */
const largestTimeFromDigits = A => {
  const gte6 = A.filter(x => x > 5);
  if (gte6.length > 2) return "";

  const gte3 = A.filter(x => x > 2);
  if (gte3.length > 3) return "";

  const lte2 = A.filter(x => x <= 2);
  if (lte2.length < 1) return "";

  let hour = -Infinity;
  let minute = 0;
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      if (i === j) continue;
      const h = A[i] * 10 + A[j];
      if (h >= 0 && h <= 23 && h > hour) {
        const [i1, i2] = [0, 1, 2, 3].filter((x, ii) => ii !== i && ii !== j);
        const m1 = A[i1] * 10 + A[i2];
        const m2 = A[i2] * 10 + A[i1];
        if (m1 >= 60 && m2 >= 60) continue;
        hour = h;
      }
    }
  }
  if (hour === -Infinity) return "";

  const h1 = Math.floor(hour / 10);
  const h2 = Math.floor(hour % 10);
  const i1 = A.indexOf(h1);
  const i2 = A.indexOf(h2, h1 === h2 ? i1 + 1 : 0);
  const remain = A.filter((x, i) => i !== i1 && i !== i2);

  const [n1, n2] = remain;
  const num1 = `${n1}${n2}` | 0;
  const num2 = `${n2}${n1}` | 0;
  if (num1 >= 60 && num2 >= 60) return "";
  if (num1 >= 60) {
    minute = `${n2}${n1}`;
  }
  if (num2 >= 60) {
    minute = `${n1}${n2}`;
  }
  if (num1 < 60 && num2 < 60) {
    if (num1 < num2) {
      minute = `${n2}${n1}`;
    } else {
      minute = `${n1}${n2}`;
    }
  }

  return `${h1}${h2}:${minute}`;
};

console.log(largestTimeFromDigits([2, 0, 6, 6]));
console.log(largestTimeFromDigits([1, 9, 6, 0]));
console.log(largestTimeFromDigits([7, 3, 6, 0]));
console.log(largestTimeFromDigits([4, 2, 4, 4]));
console.log(largestTimeFromDigits([0, 1, 1, 0]));
console.log(largestTimeFromDigits([0, 0, 1, 0]));
console.log(largestTimeFromDigits([2, 2, 2, 2]));
console.log(largestTimeFromDigits([1, 3, 9, 4]));
console.log(largestTimeFromDigits([0, 3, 3, 4]));
console.log(largestTimeFromDigits([1, 2, 3, 4]));
