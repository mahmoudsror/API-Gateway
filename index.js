const express = require('express')
const path = require('path')
const Bot = require('messenger-bot')
const bodyParser = require('body-parser')
const request = require('request');
const app= express()
const config = require(path.resolve('config','index.js'))
const sender = require(path.resolve('Broker','BrokerSenderHandler.js'))
var arabic = /[\u0600-\u06FF]/;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

let bot = new Bot({
    token: config.PAGE_ACCESS_TOKEN,
    verify: config.VERIFY_TOKEN,
    app_secret: config.APP_SECRET
})

app.get('/verify', (req, res) => {
  return bot._verify(req, res)
})
app.post('/verify',  (req, res) => {
    var data = req.body;
    if (data.object === 'page') {
 		// Iterate over each entry - there may be multiple if batched
		data.entry.forEach(function(entry) {
			// Iterate over each messaging event
			entry.messaging.forEach( function(event) {
				if (event.message) {
					var senderID = event.sender.id;
					var event_text = event.message.text;

					if (event.message && (!event.message.is_echo)) {
                        bot._handleMessage(req.body)
                        if(!arabic.test(event_text)){
                            sender.sendMessage('dialogFlow',event_text)
                            sender.receiveMessage('dialogFlow_response')

                        }else{
                            sender.sendMessage('watson',event_text)
                        }
					}
				}
				else if (event.postback) {
					postback.receivedPostback(event);
				}
			});
		});

		res.sendStatus(200);
	}

        // let text = payload.message.text
      //
      // var arabic = /[\u0600-\u06FF]/;
      //   if(!arabic.test(string)){
      //       sender.sendMessage('dialogFlow',text)
      //   }else{
      //       sender.sendMessage('watson',text)
      //   }
    //sender.sendMessage('dialogFlow','Hello ')

    //bot._handleMessage(req.body)
    //res.end(JSON.stringify({status: 'ok'}))
})

// bot.on('error', (err) => {
//   console.log(err.message)
// })
//
// bot.on('message', (payload, reply) => {
//   let text = payload.message.text
//
//   var arabic = /[\u0600-\u06FF]/;
//     if(!arabic.test(string)){
//         sender.sendMessage('dialogFlow',text)
//     }else{
//         sender.sendMessage('watson',text)
//     }
//   bot.getProfile(payload.sender.id, (err, profile) => {
//     if (err) throw err
//     console.log(profile);
//     reply({ text }, (err) => {
//       if (err) throw JSON.stringify(err)
//
//       console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
//     })
//   })
// })



var listener = app.listen(config.PORT||5000,()=>{
    console.log("Welcome to Facebook Messenger Bot API-Gateway , listen to %s",listener.address().port)
})
