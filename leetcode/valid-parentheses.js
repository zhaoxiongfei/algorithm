// https://leetcode-cn.com/problems/valid-parentheses/description/
const isValid = s => {
  const stack = [];
  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i];
    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(ch);
      continue;
    }
    if (stack.length === 0) {
      return false;
    }
    const last = stack.pop();
    if (
      (ch === ")" && last !== "(") ||
      (ch === "}" && last !== "{") ||
      (ch === "]" && last !== "[")
    ) {
      return false;
    }
  }

  return stack.length === 0;
};

console.log(isValid("()"));
