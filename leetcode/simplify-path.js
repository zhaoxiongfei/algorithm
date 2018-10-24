// https://leetcode-cn.com/problems/simplify-path/description/

/**
 * @param {string} path
 * @return {string}
 */
// 思路: 用栈的方式, 不同的部分对应的栈操作不一样
const simplifyPath = path => {
  const paths = path.split("/");
  const result = [];

  for (let i = 0; i < paths.length; i += 1) {
    const ch = paths[i];
    if (!ch) continue;
    if (ch === ".") continue;
    if (ch === "..") {
      result.pop();
      continue;
    }
    result.push(ch);
  }

  return `/${result.join("/")}`;
};

console.log(simplifyPath("/home/"));
console.log(simplifyPath("/a/./b/../../c/"));
console.log(simplifyPath("/../"));
console.log(simplifyPath("/home//foo/"));
