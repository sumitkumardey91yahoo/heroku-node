const amqp = require('amqplib/callback_api');

// Step 1: Create Connection
amqp.connect('amqp://cjjkeuhk:tCA_9BW8iIEguaBuJ-JYY047i8kmIVkE@jellyfish.rmq.cloudamqp.com/cjjkeuhk', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = 'sumit'
        channel.assertQueue(QUEUE);
        // Step 4: Receive Messages
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`)
            // check with paytm with API
        }, {
            noAck: true
        })
    })
})
