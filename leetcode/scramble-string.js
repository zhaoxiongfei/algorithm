// https://leetcode-cn.com/problems/scramble-string/description/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const isScramble = (s1, s2) => {
  const n1 = s1.length;
  const n2 = s2.length;
  if (n1 !== n2) return false;
  if (n1 === 1) return s1[0] === s2[0];
  if (n1 === 2)
    return (
      (s1[0] === s2[0] && s1[1] === s2[1]) ||
      (s1[0] === s2[1] && s1[1] === s2[0])
    );
  if (n1 === 2) console.log(s1, s2);

  const count = {};
  for (let i = 0; i < n1; i += 1) {
    if (count[s1[i]] === undefined) count[s1[i]] = 0;
    if (count[s2[i]] === undefined) count[s2[i]] = 0;
    count[s1[i]] += 1;
    count[s2[i]] -= 1;
  }
  // console.log(count);
  for (const num of Object.values(count)) if (num !== 0) return false;

  for (let i = 0; i < n1 - 1; i += 1) {
    const l11 = s1.substr(0, i + 1); // s1 的左边 l11 和 r11 互补
    const l21 = s2.substr(0, i + 1); // s2 的左边，从前往后推, l21 和 r21 互补
    const l22 = s2.substr(0, n1 - i - 1); // s2 的左边，从后往前推 l22 和 r22 互补

    const r11 = s1.substr(i + 1); // s1 的右边
    const r21 = s2.substr(i + 1); // s2 的右边, 从前往后推
    const r22 = s2.substr(n1 - 1 - i, i + 1); // s2 的右边，从后往前推

    if (
      (isScramble(l11, l21) && isScramble(r11, r21)) ||
      (isScramble(l11, r22) && isScramble(r11, l22))
    ) {
      return true;
    }
  }

  return false;
};

console.log(isScramble("great", "rgeat"));
