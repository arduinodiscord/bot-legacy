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
    // Calculating Client Uptime
    var totalSeconds = (this.client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const formattedUptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

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
    about.addField('Uptime', formattedUptime)
    message.channel.send(about)
  }
}
module.exports = AboutCommand