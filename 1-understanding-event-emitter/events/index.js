class EventEmitter {
  listeners = {}; // key-value pair

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
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
    const lis = this.listeners[eventName];
    if (!lis) return false;
    lis.forEach((fn) => {
      fn(...args);
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
}
