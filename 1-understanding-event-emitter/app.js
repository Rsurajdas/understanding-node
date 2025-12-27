// const EventEmitter = require("events");
import { EventEmitter } from "./events/index.js";

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

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

myEmitter.emit("greet", "Suraj Kumar");
myEmitter.removeListener("greet", logGreeting);
myEmitter.emit("greet", "Suraj Kumar");
