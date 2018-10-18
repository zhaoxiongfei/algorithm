const longestPalindrome = str => {
  const { length } = str;
  let start = 0;
  let maxLen = 0;

  for (let i = 0; i < length; i += 1) {
    if (maxLen > (length - i) * 2) return str.substr(start, maxLen);
    let duplicates = 0; // 重复字符个数
    while (i < length - 1 && str[i] === str[i + 1]) {
      duplicates += 1;
      i += 1;
    }
    let first = i - duplicates;
    let second = i;
    while (
      first >= 0 &&
      second < length - 1 &&
      str[first - 1] === str[second + 1]
    ) {
      first -= 1;
      second += 1;
    }
    if (second - first + 1 > maxLen) {
      start = first;
      maxLen = second - first + 1;
    }
  }

  return str.substr(start, maxLen);
};

console.log(longestPalindrome("abccbef"));
