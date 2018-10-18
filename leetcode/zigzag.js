// z 形变换
const convert = (string, rows) => {
  const { length } = string;
  const lines = [];
  for (let i = 0; i < rows; i += 1) lines.push([]);
  let row = 0;
  let order = "asc"; // 记录当前行号在升还是降
  for (let i = 0; i < length; i += 1) {
    lines[row].push(string[i]);
    if (rows === 1) continue;
    if (row === rows - 1) order = "desc";
    if (row === 0) order = "asc";
    if (order === "asc") row += 1;
    if (order === "desc") row -= 1;
  }

  return lines.map(line => line.join("")).join("");
};

// console.log(convert("PAYPALISHIRING", 4));
console.log(convert("AB", 4));
