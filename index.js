// const { data } = require('./data')
const {
  extractCustomerDescription,
  extractSupplierDescription
} = require('btprilib')

/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.
  
  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/

const contain = text => word => text.toLowerCase().indexOf(word) !== -1

module.exports = function(bp) {
  bp.middlewares.load()

  // // When wit.ai response intent == 'greeting'
  // bp.hear({'wit.entities.intent[0].value': 'greeting'}, (event, next) => {
  //   event.reply('#welcome') // See the file `content.yml` to see the block
  // })

  // // When wit.ai response intent == 'goodbye'
  // bp.hear({'wit.entities.intent[0].value': 'goodbye'}, (event, next) => {
  //   event.reply('#goodbye')
  // })

  // function handleWordDetection({ key, umm }) {
  //   bp.hear({'wit.entities.word[0].value': key }, (event, next) => {
  //     event.reply(`#${key}`)
  //   })
  // }

  // // Run loop for words
  // data
  //   .forEach(handleWordDetection)

  // // You need to call this method once you are done implementing the Actions
  // bp.wit.reinitializeClient()

  bp.hear(
    {
      platform: 'facebook',
      type: 'message',
      text: /.+/i
    },
    (event, next) => {
      const id = event.user.id
      const name = event.user.first_name + ' ' + event.user.last_name
      const text = event.text
      const nameContain = contain(name)

      console.log('User: ', name)
      console.log('text: ', text)

      if (nameContain('leya') || nameContain('tuyển')) {
        const response = extractSupplierDescription(text)
        await bp.messenger.sendText(id, 'Tin nhắn cho Út Yến')
        if (response) {
          await bp.messenger.sendText(id, response)
        }
      }

      const response = extractCustomerDescription(text)
      await bp.messenger.sendText(id, 'Tin nhắn cho khách')
      if (response) {
        await bp.messenger.sendText(id, response)
      }
    }
  )
}
