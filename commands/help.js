const { Command } = require('discord-akairo')
const config = require('../config.json')
const fs = require('fs')

class HelpCommand extends Command {
  constructor () {
    super('help', {
      aliases: ['help', '?'],
      channel: 'guild',
      description: 'Displays the help page.'
    })
  }

  exec (message) {
    var commands = []
    fs.readdir('./commands', (err, files) => {
      if (err) return console.error(err)
      files.forEach(file => {
        commands.push({
          name: config.prefix + file.replace('.js', ''),
          value: this.handler.findCommand(file.replace('.js', '')).description
        })
      })
      sendEmbed()
    })
    const sendEmbed = () => {
      const helpEmbed = this.client.util.embed({
        title: 'Arduino Bot Help',
        color: '#00b3b3',
        timestamp: new Date(),
        footer: {
          text: config.footer
        },
        fields: commands
      })
      message.channel.send(helpEmbed)
    }
  }
}
module.exports = HelpCommand
