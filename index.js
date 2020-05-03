const express = require('express')
const path = require('path')
const app = express();
const db = require('./firebaseInit')
var bodyParser = require('body-parser')
const amqp = require('amqplib/callback_api');
console.log(process.argv[2])

const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/emp', function (req, res) {
    let cityRef = db.collection('sumit').doc('emp');
    let getDoc = cityRef.get()
    .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
        res.status(200).send(doc.data())
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

})

app.post('/emp', function (req, res) {
  let data = req.body;
  console.log(req.body)
  let setDoc = db.collection('sumit').doc('emp').set(data);
   res.status(200).send("done")
});


app.get('/sumit', (req, res) => {
    res.send({
        "name": "sumit"
    })
  })

app.post('/sender', (req, res) => {

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

          channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(req.body)));

          let setDoc = db.collection('sumit').doc('emp').set(req.body);
           res.status(200).send("done")

          console.log(`Message send ${QUEUE}`);
      })
  })

})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
