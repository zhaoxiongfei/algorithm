// https://leetcode-cn.com/problems/evaluate-division/description/
// No 399. 除法求值

/**
  给出方程式 A / B = k, 其中 A 和 B 均为代表字符串的变量， k 是一个浮点型数字。
  根据已知方程式求解问题，并返回计算结果。如果结果不存在，则返回 -1.0。

  示例 :
  给定 a / b = 2.0, b / c = 3.0
  问题: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
  返回 [6.0, 0.5, -1.0, 1.0, -1.0 ]

  输入为: vector<pair<string, string>> equations,
          vector<double>& values,
          vector<pair<string, string>> queries(方程式，方程式结果，问题方程式)，
  其中 equations.size() == values.size()，即方程式的长度与方程式结果长度相等（程式与结果一一对应），并且结果值均为正数。
  以上为方程式的描述。 返回vector<double>类型。

  基于上述例子，输入如下：

  equations(方程式) = [ ["a", "b"], ["b", "c"] ],
  values(方程式结果) = [2.0, 3.0],
  queries(问题方程式) = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ].
  输入总是有效的。你可以假设除法运算中不会出现除数为0的情况，且不存在任何矛盾的结果。
 */

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
// 思路: 这其实是个图的问题，给定的方程式为图的关系，给定的字符为图的顶点
// 先构建邻接矩阵看看如何能利用
// 思路二：利用hash表快速查找来做
const calcEquation = (equations, values, queries) => {
  const tree = {};

  const set = (a, b, v) => {
    if (!tree[a]) tree[a] = {};
    tree[a][b] = v;
  };
  for (let i = 0; i < equations.length; i += 1) {
    const [a, b] = equations[i];
    // 根据给定方程填入正确的值
    set(a, b, values[i]);
    if (values[i]) set(b, a, 1 / values[i]);
  }

  // 先找到所有的顶点
  const vertex = Array.from(new Set([].concat(...equations)));
  const { length } = vertex;
  for (let i = 0; i < length; i += 1) {
    const a = vertex[i];
    if (!tree[a]) continue;
    for (let j = 0; j < length; j += 1) {
      const b = vertex[j];
      if (tree[a][b] !== undefined) continue;
      if (a === b) {
        set(a, b, 1);
        continue;
      }
      for (let k = 0; k < length; k += 1) {
        const c = vertex[k];
        if (a === c || b === c) continue;
        if (tree[a][c] !== undefined && tree[c][b] !== undefined) {
          tree[a][b] = tree[a][c] * tree[c][b];
        }
      }
    }
  }

  return queries.map(([a, b]) => {
    if (tree[a] === undefined || tree[a][b] === undefined) return -1.0;
    return tree[a][b];
  });
};

console.log(
  calcEquation(
    //    [["a", "b"], ["b", "c"]],
    //    [2.0, 3.0],
    //     [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]]
    [["x1", "x2"], ["x2", "x3"], ["x3", "x4"], ["x4", "x5"]],
    [3.0, 4.0, 5.0, 6.0],
    [
      ["x1", "x5"],
      ["x5", "x2"],
      ["x2", "x4"],
      ["x2", "x2"],
      ["x2", "x9"],
      ["x9", "x9"]
    ]
  )
);
