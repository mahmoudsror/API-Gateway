var amqp = require('amqplib/callback_api');

class sender{
    constructor(){
        amqp.connect('amqp://localhost', function(err, conn) {
            conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });
        });
    }
    sendMessage(message,queueName){

    }
}
module.exports = new sender()