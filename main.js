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
client.version = version

client
  .register()
  .login('NjA3MDk0Nzk2MTc1MDE1OTM3.XWFplg.CEzeoMCWF5KEHQojKzkiuYFErZk')
