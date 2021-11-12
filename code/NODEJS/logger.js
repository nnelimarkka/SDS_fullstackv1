const EventEmitter = require("events");
const uuid = require("uuid");

class Logger extends EventEmitter {
    log(msg) {
        //fire event
        this.emit("message", {id: uuid.v4(), msg});
    }
}

const Person = require("./person");

const person1 = new Person('John Doe', 30);

person1.greeting();

const logger = new Logger();

//receiving logger event
logger.on("message", data => {
    console.log("Called listener", data);
});

//sending messages to log() which fires the event "message"
logger.log("Hello there!");