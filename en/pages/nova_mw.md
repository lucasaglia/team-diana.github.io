# Nova Core Middleware

Nova Core Middleware is the middleware library provided by Nova Labs to develop software on their boards.  Some documentation for it is available [here](http://docs.novalabs.io); this document *does not replace it*, but integrates it with some extra information gathered from the source code.

Fundamentally, it allows to create **distributed applications based on message passing** using any network supported by the hardware (for now, the only implemented transport is the CAN bus). This mostly involves managing concurrency+parallelism, serialization/deserialization of messages and event dispatching.

(As an aside: mind the difference between concurrency and parallelism! [Here](https://blog.golang.org/concurrency-is-not-parallelism) is a talk that offers an explanation; it's about the Go programming language, but don't worry if you don't know or care about it.)

Please note that what we're doing with the Nova Core Middleware is embedded programming: this means there is no concept of isolated processes (like on "normal" OSes); the only parallelism primitive is the thread, and all threads share the whole memory space.

As an overview, the programming abstraction offered by the library is composed of the following objects:

- **Nodes**: they are basically threads that respond to system commands (such as "configure yourself", or "start yourself", etc...) and to messages received from other nodes, both local (a message coming from another thread running in the same CPU) and remote (a message received from the network).

- **Message**: think of these as simple, plain old C structs.  The structure of each message is described by a special JSON file (one message per file).  The Nova Core Tools will generate code to represent the message at runtime, serialize/deserialize it from/to the network, etc...

- **Module**: represents the board you're running the program on. It also contains the code for the main loop that initializes all nodes in lockstep, receives messages from the network and dispatches them to interested nodes.

- **Publisher**, **Subscriber**: these objects allow nodes to access the communication system to send and receive messages.

## Message passing architecture

The type of message passing pattern implemented by the Middleware is called topic-based [publisher/subscriber pattern](https://en.m.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).  In this pattern:

- all messages are tagged with a string called **topic**;

- all messages with the same *topic* tag are supposed to be of the same type (same structure);

- **Publisher** objects allow to send a message (of the correct type) to a given topic;

- **Subscriber** objects allow to receive a message from a given topic; for each message, a user-provided callback function is called with a reference to the message.

Messages flow from from each *Publisher* to all *Subscriber* objects subscribed to the relevant topic.

A note: the Middleware transparently detects when two "coupled" Publisher and Subscriber both run on the same board. In this case, no serialization/deserialization occurs, and the subscriber's callback is called directly with a reference to the message. If the callback runs on a different thread than the publisher (as is usually the case), thread synchronization happens automatically as well.

The main consequence of this optimization is that there isn't much reason to use other communication primitives. Time is better spent thinking about the correctness of the design rather than its performance: most of the time, it's more than enough to just make Nodes and have them communicate by messages. This way, if you want to change the design of the system later, and move a Node to another host, you'll only need to make some very minor changes to the code, and the rest will just work.
