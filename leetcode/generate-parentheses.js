// https://leetcode-cn.com/problems/generate-parentheses/description/

// left 初始左括号的数量
// right 初始右括号的数量
const generate = (left, right, path, paths) => {
  // 如果没有左括号可以选择，则组合完毕，剩余的右括号全部使用
  if (left === 0) {
    let i = 0;
    while (i < right) {
      path.push(")");
      i += 1;
    }
    paths.push(path.join(""));
    return;
  }
  // 剩余右括号比左括号多的时候才可以选择右括号
  if (right > left) {
    // 选择右括号
    generate(left, right - 1, path.concat(")"), paths);
  }
  // 选择左括号
  generate(left - 1, right, path.concat("("), paths);
};

// 采用二叉决策树的思路
const generateParenthesis = num => {
  const paths = [];
  generate(num - 1, num, ["("], paths);
  return paths;
};

console.log(generateParenthesis(3));
