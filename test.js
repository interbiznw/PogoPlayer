const fs = require("fs");

const acc = fs.readFileSync("./accounts.csv", "utf-8").split("\n");
console.log(acc.map(x=>x.split(",")));
