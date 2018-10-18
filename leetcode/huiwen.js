const longestPalindrome = str => {
  const newStr = `$#${str.split("").join("#")}#`;
  const len = newStr.length;
  const p = [];
  p.length = len;
  p.fill(0);
  let maxLen = -1;
  let id = 0;
  let mx = 0;
  let maxPosition = 0;
  for (let i = 1; i < len; i += 2) {
    p[i] = i < mx ? Math.min(p[2 * id - i], mx - i) : 1;
    while (newStr[i - p[i]] === newStr[i + p[i]]) p[i] += 1;
    if (mx < i + p[i]) {
      id = i;
      mx = i + p[i];
    }
    if (p[i] - 1 > maxLen) {
      maxLen = p[i] - 1;
      maxPosition = i;
    }
    // maxLen = Math.max(maxLen, p[i] - 1);
  }
  return newStr
    .substr(maxPosition - maxLen + 1, maxLen * 2 - 1)
    .split("#")
    .join("");
};

console.log(longestPalindrome("abccbef"));
