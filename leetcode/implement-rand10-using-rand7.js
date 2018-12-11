// https://leetcode-cn.com/problems/implement-rand10-using-rand7/
// No 470. 用 Rand7() 实现 Rand10()

/**
  已有方法 rand7 可生成 1 到 7 范围内的均匀随机整数，试写一个方法 rand10 生成 1 到 10 范围内的均匀随机整数。

  不要使用系统的 Math.random() 方法。

  示例 1:

  输入: 1
  输出: [7]
  示例 2:

  输入: 2
  输出: [8,4]
  示例 3:

  输入: 3
  输出: [8,1,10]


  提示:

  rand7 已定义。
  传入参数: n 表示 rand10 的调用次数。


  进阶:

  rand7()调用次数的 期望值 是多少 ?
  你能否尽量少调用 rand7() ?
 */

const stats7 = Array(7).fill(0);
const rand7 = () => 1 + (((Math.random() * 987654321) | 0) % 7);
/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
/**
  枚举如下：
    n1 1 2 3 4 5 6 7
  n2
   1   2 3 4 5 6 7 8
   2   3 4 5 6 7 8 9
   3   4 5 6 7 8 9 0
   4   5 6 7 8 9 0 1
   5   6 7 8 9 0 1 2
   6   7 8 9 0 1 2 3
   7   8 9 0 1 2 3 4
  去掉右上角的
  6 7 8
  7 8 9
  8 9 0
  后, 每个数字出现次数均为 4 次
 */
const rand10 = () => {
  const n1 = rand7();
  const n2 = rand7();
  if (n1 > 4 && n2 < 4) return rand10();
  return 1 + ((n1 + n2) % 10);
};

const stats = Array(10).fill(0);
for (let i = 0; i < 10000; i += 1) {
  stats[rand10() - 1] += 1;
}

console.log(stats);
console.log(stats7);
