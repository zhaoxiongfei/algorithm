/**
 * @param {number} N
 * @return {string}
 */
const baseNeg2 = N => {
  if (N === 0) return "0";
  let len = N < 0 ? 2 : 1;
  let sum = (-2) ** (len - 1);
  if (0 < N) {
    while (sum < N) {
      len += 2;
      sum += (-2) ** (len - 1);
    }
  } else {
    while (N < sum) {
      len += 2;
      sum += (-2) ** (len - 1);
    }
  }

  const ans = Array(len).fill(0);
  ans[0] = 1;

  const curr = (-2) ** (len - 1);
  const diff = N - curr;
  if (diff) {
    const post = baseNeg2(diff);
    const { length } = post;
    for (let i = 1; i <= length; i += 1) {
      ans[len - i] = post[length - i];
    }
  }

  return ans.join("");
};

console.log(baseNeg2(5));
console.log(baseNeg2(2));
console.log(baseNeg2(3));
console.log(baseNeg2(4));
console.log(baseNeg2(-2));
console.log(baseNeg2(-5));
