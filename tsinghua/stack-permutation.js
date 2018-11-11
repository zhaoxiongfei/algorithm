// 栈混洗的甄别

const check = str => {
  const n = str.length;
  const A = [];
  const B = [];
  const S = [];
  for (let i = n; i >= 1; i -= 1) A.push(i.toString());

  let i = 0;
  while (i < n) {
    const ch = str[i];
    if (S[S.length - 1] !== ch) {
      while (A.length) {
        const a = A.pop();
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

console.log(check("312"));
console.log(check("1324"));
