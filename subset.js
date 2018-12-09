// https://www.bilibili.com/video/av1430384?from=search&seid=12446851207563910234
// 思路: 待处理字符串第一个字符是否要保留，一次递归，知道待处理的字符串为空
/*
                                (_, abc)
                            /             \
                           /               \
                          /                 \
                         /                   \
                        /                     \
                 (a, bc)                      (_, bc)
                 /      \                    /      \
                /        \                  /        \
               /          \                /          \
          (ab, c)      (a, c)         (b, c)         (_, c)
          /  \         /  \             /  \           /  \
         /    \       /    \           /    \         /    \
 (abc, _)  (ab, _) (ac, _) (a, _)  (bc, _)  (b, _) (c, _) (_, _)
*/

const subset = (s, pre = "", solution = []) => {
  if (!s) {
    // 递归基
    solution.push(pre);
  } else {
    subset(s.slice(1), pre + s[0], solution); // 选择第一个字符
    subset(s.slice(1), pre, solution); // 放弃第一个字符
  }

  return solution;
};

console.log(subset(process.argv[2]));
