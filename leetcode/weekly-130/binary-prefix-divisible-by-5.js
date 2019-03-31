/**
 * @param {number[]} A
 * @return {boolean[]}
 */
const prefixesDivBy5 = A => {
  const { length } = A;
  const ans = Array(length).fill(false);
  let mod = 0;
  for (let i = 0; i < length; i += 1) {
    mod = mod * 2 + A[i];
    mod %= 5;
    ans[i] = mod === 0;
  }

  return ans;
};

console.log(prefixesDivBy5([0, 1, 1]));
console.log(prefixesDivBy5([1, 1, 1]));
console.log(prefixesDivBy5([0, 1, 1, 1, 1, 1]));
console.log(prefixesDivBy5([1, 1, 1, 0, 1]));
