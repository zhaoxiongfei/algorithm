// https://leetcode-cn.com/contest/weekly-contest-111/problems/delete-columns-to-make-sorted/
//

/**
 * @param {string[]} A
 * @return {number}
 */
const minDeletionSize = A => {
  const m = A.length;
  const n = A[0].length;

  let count = 0;
  for (let i = 0; i < n; i += 1) {
    for (let j = 1; j < m; j += 1) {
      if (A[j][i] < A[j - 1][i]) {
        count += 1;
        break;
      }
    }
  }

  return count;
};

console.log(minDeletionSize(["cba", "daf", "ghi"]));
console.log(minDeletionSize(["a", "b"]));
console.log(minDeletionSize(["zyx", "wvu", "tsr"]));
