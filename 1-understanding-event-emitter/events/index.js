export class EventEmitter {
  listeners = {}; // key-value pair
  maxListeners = 10;

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const len = this.listenerCount(eventName);
    if (len >= this.maxListeners) {
      throw new Error(
        `Warning: Possible EventEmitter memory leak detected. ${
          len + 1
        } ${eventName} listeners added. Use emitter.setMaxListeners() to increase limit`
      );
    } else {
      this.listeners[eventName].push(fn);
    }
    return this;
  }
  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    const lis = this.listeners[eventName];
    if (!lis) return this;
    this.listeners[eventName] = lis.filter((listener) => listener !== fn);
    return this;
  }
  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  emit(eventName, ...args) {
    const fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((fn) => {
      if (typeof fn === "function") {
        fn(...args);
      }
    });
    return true;
  }

  listenerCount(eventName) {
    const lis = this.listeners[eventName] || [];
    return lis.length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }

  eventNames() {
    return Object.keys(this.listeners);
  }

  setMaxListeners(n) {
    this.maxListeners = n;
  }
}
