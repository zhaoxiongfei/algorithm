// https://leetcode-cn.com/problems/valid-number/description/

const isNumber = s => {
  const str = s.trim().toLowerCase();
  const { length } = str;
  // 长度为零不合法
  if (length === 0) return false;
  // 孤零零一个点不合法
  if (str === ".") return false;
  // 全部为零是合法的
  if (/^0*$/.test(str)) return true;

  const numbers = new Set([
    "+",
    "-",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "e"
  ]);

  let foundMinusSgin = false; // 是否出现了负号
  let foundPlusSgin = false; // 是否出现了正号
  let foundPoint = false; // 是否出现了点 (.)
  let foundE = false; // 是否出现了科学计数法的 E
  let foundNumber = false; // 是否出现了 0 ~ 9 数字
  for (let i = 0; i < length; i += 1) {
    const ch = str[i];
    if (!numbers.has(ch)) return false;
    if (ch === ".") {
      const second = str[i + 1];
      if (second === "+" || second === "-") return false;
      // 小数点前面不能有其他小数点，不能有 E
      if (foundPoint || foundE) return false;
      foundPoint = true;
    } else if (ch === "e") {
      // 科学计数法前面不能还有科学计数法 E
      if (foundE) return false;
      // 科学计数法后面不能为空
      if (str[i + 1] === undefined) return false;
      if (str[i + 1] === "-") {
        const third = str[i + 2];
        if (third === "." || third === undefined) return false;
      }
      // 科学计数法前面一定要出现正常的数字
      if (!foundNumber) return false;
      foundE = true;
      foundMinusSgin = false; // e 后面有可以有负号了，所以这里先设置为false
      foundPlusSgin = false; // e 后面有可以有正号了，所以这里先设置为false
      foundNumber = false;
    } else if (ch === "-") {
      if (foundMinusSgin) return false;
      if (str[i + 1] === undefined) return false;
      // 不在 e 的后面，且已经出现了数字，则直接返回 false
      if (foundNumber && str[i - 1] !== "e") return false;
      foundMinusSgin = true;
      foundPlusSgin = false;
    } else if (ch === "+") {
      if (foundPlusSgin) return false;
      if (str[i + 1] === undefined) return false;
      // 不在 e 的后面，且已经出现了数字，则直接返回 false
      if (foundNumber && str[i - 1] !== "e") return false;
      foundMinusSgin = false;
      foundPlusSgin = true;
    } else {
      foundNumber = true;
    }
  }

  return /\d/.test(str);
};

console.log(isNumber("0"));
console.log(isNumber(" 0.1"));
console.log(isNumber("abc"));
console.log(isNumber("1 a"));
console.log(isNumber("2e10"));
console.log(isNumber("2E10"));
console.log(isNumber("2E1E0"));
console.log(isNumber("E1"));
console.log(isNumber("-1."));
console.log(isNumber("+.8"));
console.log(isNumber(".-8"));
console.log(isNumber(".+8"));
console.log(isNumber("46.e30"));
