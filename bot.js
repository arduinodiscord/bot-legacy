const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo')
const Discord = require('discord.js')
const version = require('./package.json').version
const config = require('./config.json')

const embed = new Discord.MessageEmbed()
.setFooter(config.embeds.footer)
.setColor(config.embeds.color)

module.exports = {
  embed
}

class MainClient extends AkairoClient {
  constructor () {
    super({
      ownerID: ['200616508328509442', '223217915673968641']
    }, {
      fetchAllMembers: true,
      presence: {
        status: 'online',
        activity: {
          name: `Arduino | v${version}`,
          type: 'WATCHING'
        }
      }
    })
    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: config.prefix,
      defaultCooldown: 5000
    })
    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/'
    })
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.listenerHandler.loadAll()
    this.commandHandler.loadAll()
  }
}
const client = new MainClient()
client.login(process.env.BOT_TOKEN)
