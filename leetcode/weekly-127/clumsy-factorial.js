/**
 * @param {number} N
 * @return {number}
 */
const dict = ["*", "/", "+", "-"];
const clumsy = N => {
  const stack = [N];
  for (let i = 1; i < N; i += 1) {
    const op = dict[(i - 1) % 4];
    if (op === "*") {
      stack[stack.length - 1] *= N - i;
    } else if (op === "/") {
      if (stack[stack.length - 1] < 0) {
        stack[stack.length - 1] = -Math.floor(
          -stack[stack.length - 1] / (N - i)
        );
      } else {
        stack[stack.length - 1] = Math.floor(stack[stack.length - 1] / (N - i));
      }
    } else if (op === "+") {
      stack.push(N - i);
    } else if (op === "-") {
      stack.push(i - N);
    }
  }

  return stack.reduce((m, x) => m + x, 0);
};

console.log(clumsy(4));
console.log(clumsy(10));
