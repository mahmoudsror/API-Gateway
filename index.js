const express = require('express')
const path = require('path')
const Bot = require('messenger-bot')
const bodyParser = require('body-parser')
const app= express()
const config = require(path.resolve('config','index.js'))
const sender = require(path.resolve('Broker','BrokerSenderHandler.js'))
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
app.post('/verify', (req, res) => {
    bot._handleMessage(req.body)
    //res.end(JSON.stringify({status: 'ok'}))
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err
    console.log(profile);
    reply({ text }, (err) => {
      if (err) throw JSON.stringify(err)

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})



var listener = app.listen(config.PORT||5000,()=>{
    console.log("Welcome to Facebook Messenger Bot API-Gateway , listen to %s",listener.address().port)
})
