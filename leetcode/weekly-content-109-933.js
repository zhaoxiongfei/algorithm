// https://leetcode-cn.com/contest/weekly-contest-109/problems/number-of-recent-calls/
function RecentCounter() {
  const stack = [];

  const ping = t => {
    const start = t - 3000;
    let i = 0;
    while (i < stack.length) {
      if (stack[i] >= start) break;
      i += 1;
    }
    stack.push(t);
    return stack.length - i;
  };

  return { ping };
}

const r = new RecentCounter();
console.log(r.ping(1));
console.log(r.ping(100));
console.log(r.ping(3001));
console.log(r.ping(3002));
