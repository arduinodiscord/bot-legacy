const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')
const { version } = require('../package.json')

var packLock
try {
  packLock = require('../package-lock.json')
} catch (err) {
  packLock = undefined
}

class AboutCommand extends Command {
  constructor() {
    super('about', {
      aliases: ['about'],
      description: 'Get information about this bot.'
    })
  }

  exec(message) {
    const about = new MessageEmbed(embed)
    .setTimestamp(new Date())
    .setTitle('About Arduino Bot')
    .addField('Bot Version', version)
    .addField('Node Version', process.version)

    if (packLock) {
      about.addField('DiscordJS Version', 'v' + packLock.dependencies['discord.js'].version)
    }
    message.channel.send(about)
  }
}
module.exports = AboutCommand