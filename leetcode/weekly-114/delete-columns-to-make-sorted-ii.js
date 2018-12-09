// https://leetcode-cn.com/contest/weekly-contest-114/problems/delete-columns-to-make-sorted-ii/

/**
 * @param {string[]} A
 * @return {number}
 */
const minDeletionSize = A => {
  const { length } = A;
  const n = A[0].length;

  const removed = [];
  const ignore = new Set();
  let len = 0;
  for (let i = 0; i < n; i += 1) {
    let correct = true;
    const _ignore = [];
    for (let j = 1; j < length; j += 1) {
      if (ignore.has(j)) {
        continue;
      }
      if (A[j][i] < A[j - 1][i]) {
        correct = false;
        len += 1;
        removed.push(i);
        break;
      }
      if (A[j][i] === A[j - 1][i]) {
        correct = false;
      } else {
        _ignore.push(j);
      }
    }
    if (correct) break;
    if (removed[removed.length - 1] !== i) {
      for (const ig of _ignore) ignore.add(ig);
    }
  }

  return len;
};

console.log(minDeletionSize(["doeeqiy", "yabhbqe", "twckqte"]));
console.log(minDeletionSize(["abx", "agz", "bgc", "bfc"]));
console.log(minDeletionSize(["xga", "xfb", "yfa"]));
console.log(minDeletionSize(["xc", "yb", "za"]));
console.log(minDeletionSize(["ca", "bb", "ac"]));
console.log(minDeletionSize(["zyx", "wvu", "tsr"]));
