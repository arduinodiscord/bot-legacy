const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')
const { version } = require('../package.json')

class AboutCommand extends Command {
  constructor() {
    super('about', {
      aliases: ['about'],
      description: 'Get information about this bot.'
    })
  }

  exec(message) {
    message.channel.send(
      new MessageEmbed(embed)
      .setTimestamp(new Date())
      .setTitle('About Arduino Bot')
      .addField('Version', version)
    )
  }
}
module.exports = AboutCommand