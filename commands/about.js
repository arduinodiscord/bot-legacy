const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')
const { version } = require('../package.json')
const { Duration } = require('luxon')

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
    .addField('Bot Version', version, true)
    .addField('Node Version', process.version, true)

    if (packLock) {
      about.addField('DiscordJS Version', 'v' + packLock.dependencies['discord.js'].version, true)
      about.addField('Akairo Version', 'v' + packLock.dependencies['discord-akairo'].version, true)
    }
    about.addField('Contributing', '[GitHub](https://github.com/BluLightShow/arduino-bot)', true)
    var clientDuration = Duration.fromMillis(this.client.uptime).toFormat('d h m').split(' ')
    about.addField('Uptime', `${clientDuration[0]} days, ${clientDuration[1]} hours, ${clientDuration[2]} minutes`)
    message.channel.send(about)
  }
}
module.exports = AboutCommand