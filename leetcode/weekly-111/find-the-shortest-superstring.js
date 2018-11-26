// https://leetcode-cn.com/contest/weekly-contest-111/problems/find-the-shortest-superstring/

/**
 * @param {string[]} A
 * @return {string}
 */
const shortestSuperstring = (A, pre = []) => {
  if (A.length === 0) return "";
  const { length } = pre;
  if (length === 0) {
    pre.push(A[0]);
  } else {
    for (let i = 0; i < length; i += 1) {
      pre.push(pre[i] + A[0]);
      pre.push(A[0] + pre[i] + A[0]);
    }
  }
  shortestSuperstring(A.slice(1), pre);
  let minLength = pre[0].length;
  let superStr = pre[0];
  for (const str of pre) {
    if (str.length < minLength) {
      minLength = str.length;
      superStr = str;
    }
  }
  return superStr;
};

console.log(shortestSuperstring(["catg", "ctaagt", "gcta", "ttca", "atgcatc"]));
