// const EventEmitter = require("events");
import EventEmitter from "events";

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("greet", () => {
  console.log("Hello, there!");
});

myEmitter.on("greet", (name) => {
  if (typeof name === "string") {
    console.log(`Hello, ${name}!`);
  } else {
    console.error("No name provided!");
  }
});

myEmitter.emit("greet", "Suraj Kumar");
