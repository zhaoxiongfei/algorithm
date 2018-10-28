// https://leetcode-cn.com/contest/weekly-contest-108/problems/unique-email-addresses/
//
/**
 * @param {string[]} emails
 * @return {number}
 */
// 思路：挨个处理，利用 set 去重
const numUniqueEmails = emails => {
  const { length } = emails;
  const mails = new Set();
  for (let i = 0; i < length; i += 1) {
    const [local, domain] = emails[i].split("@");
    mails.add(
      `${local
        .split("+")[0]
        .split(".")
        .join("")}@${domain}`
    );
  }

  return mails.size;
};

console.log(
  numUniqueEmails([
    "test.email+alex@leetcode.com",
    "test.e.mail+bob.cathy@leetcode.com",
    "testemail+david@lee.tcode.com"
  ])
);
