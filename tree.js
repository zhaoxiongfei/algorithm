const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ");

const inPre2Post = (inOrder, preOrder, length, postOrder) => {
  if (length <= 0) return;
  if (length === 1) {
    postOrder[postOrder._index] = preOrder[0];
    postOrder._index += 1;
    return;
  }
  const root = preOrder[0];
  let rIndex = 0;
  for (; rIndex < length; rIndex += 1) {
    if (inOrder[rIndex] === root) break;
  }
  inPre2Post(inOrder, preOrder.substr(1), rIndex, postOrder);
  inPre2Post(
    inOrder.substr(rIndex + 1),
    preOrder.substr(rIndex + 1),
    length - (rIndex + 1),
    postOrder
  );
  postOrder[postOrder._index] = root;
  postOrder._index += 1;
};

const calc = str => {
  const [preOrder, inOrder] = init(str);
  const { length } = preOrder;
  const postOrder = [];
  postOrder._index = 0;
  index = 0;
  inPre2Post(inOrder, preOrder, length, postOrder);
  return postOrder.join("");
};

// 根据中序、前序计算后序遍历串
// 前序遍历 GDAFEMHZ
// 中序遍历 ADEFGHMZ
rl.on("line", input => {
  console.log(calc(input.trim()));
});
