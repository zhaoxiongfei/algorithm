// https://leetcode-cn.com/problems/find-the-closest-palindrome/
// No 564. 寻找最近的回文数

/**
  给定一个整数 n ，你需要找到与它最近的回文数（不包括自身）。

  “最近的”定义为两个整数差的绝对值最小。

  示例 1:

  输入: "123"
  输出: "121"
  注意:

  n 是由字符串表示的正整数，其长度不超过18。
  如果有多个结果，返回最小的那个。
 */

/**
 * @param {string} n
 * @return {string}
 */
// 思路: 这个题如果没有不包含自身这个限制条件就很简单了，只要让右侧对称的位置强制等于左侧即可
// 终于完成一个最恶心的代码
const nearestPalindromic1 = n => {
  const { length } = n;
  const arr = Array.from(n).map(x => +x);

  if (
    length > 1 &&
    arr[0] === 1 &&
    arr[length - 1] < 2 &&
    arr.slice(1, -1).every(x => x === 0)
  ) {
    return "9".repeat(length - 1);
  }

  if (n === "99") return "101";

  if (length > 2 && arr.slice(1, -1).every(x => x === 9)) {
    arr[0] += 1;
    for (let k = 1; k < length; k += 1) arr[k] = 0;
    arr[length - 1] = arr[0] === 10 ? 1 : arr[0];
    return arr.join("");
  }

  const mi = length >> 1;

  const num = (start, end) => arr.slice(start, end + 1);
  const origNum = (start, end) => +n.slice(start, end + 1);

  const offset = length % 2 === 0 ? 0 : 1;
  for (let i = 0; i < mi; i += 1) {
    // if (arr[mi - i - 1] === arr[mi + i + offset]) continue;
    const left = arr[mi - i - 1];
    const middle = arr[mi];
    const middlePre = arr[mi - 1];
    const orig = origNum(mi - i - 1, mi + i + offset);

    arr[mi + i + offset] = left;
    const cases = [];
    cases.push(num(mi - i - 1, mi + i + offset));

    if (length % 2) {
      arr[mi] = middle + 1;
      cases.push(num(mi - i - 1, mi + i + offset));
      arr[mi] = middle - 1;
      cases.push(num(mi - i - 1, mi + i + offset));
      arr[mi] = middle;
    } else if (i > 0) {
      if (middle < 9) {
        arr[mi] = middle + 1;
        arr[mi - 1] = middle + 1;
        cases.push(num(mi - i - 1, mi + i + offset));
        arr[mi] = middle;
      }
      if (middle > 0) {
        arr[mi] = middle - 1;
        arr[mi - 1] = middle - 1;
        cases.push(num(mi - i - 1, mi + i + offset));
        arr[mi - 1] = middlePre;
      }
    }

    if (left > 0) {
      arr[mi - i - 1] = left - 1;
      for (let k = mi - i; k < mi + i + offset; k += 1) arr[k] = 9;
      arr[mi + i + offset] = left - 1;
      cases.push(num(mi - i - 1, mi + i + offset));
    }

    if (left < 9) {
      arr[mi - i - 1] = left + 1;
      for (let k = mi - i; k < mi + i + offset; k += 1) arr[k] = 0;
      arr[mi + i + offset] = left + 1;
      cases.push(num(mi - i - 1, mi + i + offset));
    }
    cases.sort((a, b) => a.join("") - b.join(""));

    let min = [Infinity];
    for (const _case of cases) {
      if (+_case.join("") === orig) {
        continue;
      }
      if (Math.abs(orig - _case.join("")) < Math.abs(orig - min.join("")))
        min = _case;
    }

    // console.log("arr: %s, cases: %o, min: %s", arr, cases, min);
    for (let k = 0; k < min.length; k += 1) {
      arr[mi - i - 1 + k] = +min[k];
    }
  }

  console.log(arr);
  if (arr.join("") === n) {
    if (arr[mi] === 0) {
      if (
        arr[0] === 1 &&
        arr[length - 1] === 1 &&
        arr.slice(1, -1).every(x => x === 0)
      ) {
        arr.length -= 1;
        arr.fill(9);
      } else if (length % 2) {
        arr[mi] = 1;
      } else if (arr[mi] === 0) {
        arr[mi] = 1;
        arr[mi - 1] = 1;
      }
    } else if (arr.length > 1 && arr.every(x => x === 9)) {
      console.log("fuck");
      arr.fill(0);
      arr[0] = 1;
      arr.push(1);
    } else if (length % 2 === 0) {
      console.log("you");
      if (arr.every(x => x === 1)) {
        arr.length -= 1;
        arr.fill(9);
      } else {
        arr[mi] -= 1;
        arr[mi - 1] -= 1;
      }
    } else {
      arr[mi] -= 1;
    }
  }

  return arr.join("");
};

// 思路二: 上面的代码简直不忍直视, 接下来换思路继续做
// 想到一种办法 其实就是找 [start ~ n) 之间的回文数字串, start 从 0 开始，知道无法再大, start可以大于 n
const nearestPalindromic = n => {
  return arr.join("");
};

console.log(nearestPalindromic("12"));
console.log(nearestPalindromic("99"));
/*
console.log(nearestPalindromic("7722"));
console.log(nearestPalindromic("1837722381"));
console.log(nearestPalindromic("1111"));
console.log(nearestPalindromic("2002"));
console.log(nearestPalindromic("12389"));
console.log(nearestPalindromic("100"));
console.log(nearestPalindromic("10"));
console.log(nearestPalindromic("1283"));
console.log(nearestPalindromic("2772"));
console.log(nearestPalindromic("1234"));
console.log(nearestPalindromic("123"));
console.log(nearestPalindromic("1001"));
console.log(nearestPalindromic("11"));
console.log(nearestPalindromic("1213"));
console.log(nearestPalindromic("9"));
console.log(nearestPalindromic("1"));
console.log(nearestPalindromic("101"));
*/
