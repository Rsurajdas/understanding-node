// const EventEmitter = require("events");
import { EventEmitter } from "./events/index.js";

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.setMaxListeners(15);

myEmitter.on("greet", () => {
  console.log("Hello, there!");
});

const logGreeting = (name) => {
  if (typeof name === "string") {
    console.log(`Hello, ${name}!`);
  } else {
    console.error("No name provided!");
  }
};

myEmitter.on("greet", logGreeting);
myEmitter.on("greet", () => {
  console.log("Greetings! 1");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 2");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 3");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 4");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 5");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 6");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 7");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 8");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 9");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 10");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 11");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 12");
});
myEmitter.on("greet", () => {
  console.log("Greetings! 13");
});
// myEmitter.on("greet", () => {
//   console.log("Greetings! 14");
// });

myEmitter.emit("greet", "Suraj Kumar");
