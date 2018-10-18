const isMatch = (string, pattern) => new RegExp(`^${pattern}$`).test(string);

console.log(isMatch("abc", "a.*"));
