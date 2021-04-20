const { Command } = require('discord-akairo')
const config = require('../config.json')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')

class TagCommand extends Command {
  constructor() {
    super('tag', {
      aliases: ['tag', 'qr', 'res'],
      channel: 'guild',
      description: 'Send a canned response in the channel.',
      args: [
        {
          id: 'tagAlias',
          type: 'string'
        }
      ]
    })
  }

  exec(message, args) {
    var files = fs.readdirSync('./tags')
    files.forEach(file => {
      if (file.endsWith('.json') && (file !== 'template.json')) {
        var tagFile = JSON.parse(fs.readFileSync(`./tags/${file}`))
        if (tagFile.aliases.includes(args.tagAlias)) {
          var tagEmbed = new MessageEmbed(embed)
            .setTitle(tagFile.title)

          if (tagFile.image) tagEmbed.setImage(tagFile.image)
          tagFile.fields.forEach(field => {
            tagEmbed.addField(field.name, field.value, false)
          })

          message.channel.send(tagEmbed)
        }
      }
    })
  }
}
module.exports = TagCommand
