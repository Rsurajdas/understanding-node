// import * as fs from "node:fs/promises"
//
// (async () => {
//     const fileHandler = await fs.open("./test.txt", "w")
//
//     console.time("WriteMany");
//     for (let i = 0; i < 1000000; i++) {
//         await fileHandler.write(`${i}\n`)
//     }
//     console.timeEnd("WriteMany");
//     fileHandler.close()
// })()

import * as fs from "node:fs";

(() => {
  fs.open("./test.txt", "w", (err, fd) => {
    if (err) throw err;
    console.time("WriteMany");
    for (let i = 0; i < 1000000; i++) {
      fs.write(fd, `${i}\n`, () => {});
    }
    console.timeEnd("WriteMany");
  });
})();

// Callback functions are lot faster than promise function