/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
const addToArrayForm = (A, K) => {
  const ans = [];
  const B = K.toString()
    .split("")
    .map(x => +x);
  let flag = 0;
  while (A.length || B.length) {
    let x = 0;
    if (A.length) x = A.pop();
    let y = 0;
    if (B.length) y = B.pop();
    ans.push((flag + x + y) % 10);
    flag = 9 < flag + x + y ? 1 : 0;
  }
  if (flag) ans.push(flag);

  return ans.reverse();
};

console.log(addToArrayForm([1, 2, 0, 0], 34));
console.log(addToArrayForm([2, 7, 4], 181));
console.log(addToArrayForm([2, 1, 5], 806));
console.log(addToArrayForm([9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 1));
