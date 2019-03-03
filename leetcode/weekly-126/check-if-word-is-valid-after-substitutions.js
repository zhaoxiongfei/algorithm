/**
 * @param {string} S
 * @return {boolean}
 */
const isValid = S => {
  const { length } = S;
  S = S.replace(/abc/g, "");
  if (S.length === 0) return true;
  if (S.length < length) return isValid(S);
  return false;
};

console.log(isValid("aabcbc"));
console.log(isValid("abcabcababcc"));
console.log(isValid("abccba"));
console.log(isValid("cababc"));
