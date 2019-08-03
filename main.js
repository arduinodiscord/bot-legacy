require('module-alias/register')
const Discord = require('discord.js')
const Client = require('@model/Bot.js')
const version = require('@root/package.json').version
const client = new Client()

module.exports = {
  client: client,
  version: version
}

client.footer = 'Have a bug to report or a feature to request? Contact a mod!'

client
  .register()
  .login(process.env.BOT_TOKEN)
