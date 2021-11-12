const EventEmitter = require("events");

//class
class MyEmitter extends EventEmitter {}

//init object
const myEmitter = new MyEmitter();

// listener
myEmitter.on("event", () => console.log("Event fired"));


//fire event with emit()
myEmitter.emit("event");