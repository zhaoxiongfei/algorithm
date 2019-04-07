/**
 * @param {string} S
 * @return {string}
 */
const removeOuterParentheses = S => {
  let count = 0;
  const list = [];
  let curr = "";
  for (const ch of S) {
    if (ch === "(") {
      count += 1;
      curr += "(";
    } else {
      count -= 1;
      curr += ")";
      if (!count) {
        list.push(curr.slice(1, -1));
        curr = "";
      }
    }
  }

  // console.log(list);
  return list.join("");
};

console.log(removeOuterParentheses("(()())(())"));
console.log(removeOuterParentheses("(()())(())(()(()))"));
console.log(removeOuterParentheses("()()"));
