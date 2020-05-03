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
        // Step 4: Send message to queue
       // channel.sendToQueue(QUEUE, Buffer.from('1 sumit done'));
        setTimeout(() => {
            channel.sendToQueue(QUEUE, Buffer.from('2 sumit ok'));
        }, 5000)


        console.log(`Message send ${QUEUE}`);
    })
})
