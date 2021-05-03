const { Command } = require('discord-akairo')
const config = require('../config.json')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')
var files = fs.readdirSync('./tags')

var aggregateAliases = []
files.forEach(file => {
  if (file.endsWith('.json') && (file !== 'template.json')) {
    var tagFile = JSON.parse(fs.readFileSync(`./tags/${file}`))
    aggregateAliases = [...aggregateAliases, ...tagFile.directAliases]
  }
})


class TagCommand extends Command {
  constructor() {
    super('tag', {
      aliases: [...aggregateAliases, 'tag', 'qr', 'res'],
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
    // var usedAlias = message.util.parsed.alias -- This should work but it's not so I'm writing a workaround
    var usedAlias = message.content.replace(config.prefix, '').split(' ')[0]
    if (usedAlias === ('tag' || 'qr' || 'res')) {
      if (!args.tagAlias) {
        var tagEmbed = new MessageEmbed(embed)
        .setTitle("List of available tags")
        files.forEach(file => {
          if (file.endsWith('.json') && (file !== 'template.json')) {
            var tagFile = JSON.parse(fs.readFileSync(`./tags/${file}`))
            tagEmbed.addField(tagFile.directAliases[0], tagFile.title)
          }
        })
        message.channel.send(tagEmbed)
      } else {
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

              return message.channel.send(tagEmbed)
            }
          }
        })
      }
    } else {
      files.forEach(file => {
        if (file.endsWith('.json') && (file !== 'template.json')) {
          var tagFile = JSON.parse(fs.readFileSync(`./tags/${file}`))
          if (tagFile.directAliases.includes(usedAlias)) {
            var tagEmbed = new MessageEmbed(embed)
              .setTitle(tagFile.title)

            if (tagFile.image) tagEmbed.setImage(tagFile.image)
            tagFile.fields.forEach(field => {
              tagEmbed.addField(field.name, field.value, false)
            })

            return message.channel.send(tagEmbed)
          }
        }
      })
    }
  }
}
module.exports = TagCommand
