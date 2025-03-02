const { readFile, writeFile } = require("fs");

console.log("started a first task");
// CHECK FILE PATH!!!!
readFile(
  "/home/abdel/nodeTuts/node-express-course/01-node-tutorial/content/first.txt",
  "utf8",
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    console.log("completed first task");
  },
);
console.log("starting next task");
