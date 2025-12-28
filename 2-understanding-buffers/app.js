import { Buffer } from "node:buffer";
/*
const memoryContainer = Buffer.alloc(4); // Allocate 4 bytes of memory
memoryContainer.writeInt8(-40, 0); // Write the value -40 at the first byte
console.log(memoryContainer);
console.log(memoryContainer.readInt8(0)); // Read the value at the first byte
*/

// Challenge
/*
const challengeMemoryContainer = Buffer.alloc(3); // Allocate 3 bytes of memory => 24 bits
challengeMemoryContainer.writeInt8(72, 0);
challengeMemoryContainer.writeInt8(105, 1);
challengeMemoryContainer.writeInt8(33, 2);
console.log(challengeMemoryContainer.toString("utf-8"));
*/
// Alternative solution using Buffer.from()
/*
const challengeMemoryContainer = Buffer.from([0x48, 0x69, 0x21]);
console.log(challengeMemoryContainer.toString("utf-8"));
*/
const challengeMemoryContainer = Buffer.from("486921", "hex");
console.log(challengeMemoryContainer.toString("utf-8"));
