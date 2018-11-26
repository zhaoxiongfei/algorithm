// https://leetcode-cn.com/contest/weekly-contest-112/problems/validate-stack-sequences/
// No 946. 验证栈序列

/**
  给定 pushed 和 popped 两个序列，
  只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，返回 true；否则，返回 false 。


  示例 1：

  输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
  输出：true
  解释：我们可以按以下顺序执行：
  push(1), push(2), push(3), push(4), pop() -> 4,
  push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
  示例 2：

  输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
  输出：false
  解释：1 不能在 2 之前弹出。
 */

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
const validateStackSequences = (pushed, popped) => {
  const n = pushed.length;
  if (n !== popped.length) return false;
  pushed.reverse();
  const B = [];
  const S = [];
  let i = 0;
  while (i < n) {
    const ch = popped[i];
    if (S[S.length - 1] !== ch) {
      while (pushed.length) {
        const a = pushed.pop();
        S.push(a);
        if (a === ch) break;
      }
    }

    if (S[S.length - 1] !== ch) return false;
    B.push(S.pop());
    i += 1;
  }

  return S.length === 0;
};

console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]));
console.log(
  validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2], [1, 2, 3, 4, 5])
);
