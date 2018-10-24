// https://leetcode-cn.com/problems/valid-number/description/
//
// 换一个思路: 把字符串用 e 切开，分别判断，这样每部分都不包含e了
// 这样一来规则得到简化
// 之后每一部分在用 . 切开, 规则进一步得到简化
// 最小部分就都是整数了,
// 正负号处理规则如下描述
// 1. 正负号可以出现在数字的开头或者e的后面
// 2. 出现在开头的正负号可以多个，但是不能连续两个或以上相同
// 3. 出现在e后面的不能有多个
const isUnsignedInt = str => /^\d+$/.test(str);

const isNumber = s => {
  let str = s.trim().toLowerCase();
  const { length } = str;
  // 长度为零不合法
  if (length === 0) return false;
  // 孤零零一个点不合法
  if (str === ".") return false;
  // 全部为零是合法的
  if (/^0*$/.test(str)) return true;

  // 1. 先去掉最开头的 +- 号
  const signExp = /^[+-]+/;
  const inValidSignExp = /\+\+|--/; // 两个连续的正好，或者负号
  const match = str.match(signExp);
  if (match) {
    if (inValidSignExp.test(match[0])) return false;
    str = str.replace(match[0], "");
  }

  // 2. 先用 e 分割
  const splitByE = str.split("e");
  // 包含多个 e 直接返回 false
  if (splitByE.length > 2) return false;
  if (splitByE.length === 2 && !splitByE[1]) return false;

  // e 后面的之能是整数，如果不是直接返回 false
  if (splitByE[1]) {
    let num = splitByE[1];
    if (num[0] === "+" || num[0] === "-") {
      num = num.slice(1);
    }
    if (!isUnsignedInt(num)) return false;
  }

  // 第一部分必须要存在，不存在直接返回 false
  if (!splitByE[0]) return false;

  // 3. 用 . 分割第一部分, 这一部分允许是小数
  const splitByPoint = splitByE[0].split(".");
  // 包含多个 . 直接返回 false
  if (splitByPoint.length > 2) return false;
  if (!splitByPoint[0] && !splitByPoint[1]) return false;
  if (splitByPoint[0] && !isUnsignedInt(splitByPoint[0])) return false;
  if (splitByPoint[1] && !isUnsignedInt(splitByPoint[1])) return false;

  return true;
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
console.log(isNumber("0e"));
