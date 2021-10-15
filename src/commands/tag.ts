import { Command } from 'discord-akairo'
import fs from 'fs'
import { MessageEmbed } from 'discord.js'
import { embed, config } from '../bot'

let files = fs.readdirSync('./src/tags')

var aggregateAliases: any[] = []
files.forEach(file => {
  if (file.endsWith('.json') && file !== 'template.json') {
    var tagFile = JSON.parse(fs.readFileSync(`./src/tags/${file}`, 'utf-8'))
    aggregateAliases = [...aggregateAliases, ...tagFile.directAliases]
  }
})

export default class TagCommand extends Command {
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

  exec(message: any, args: any) {
    // var usedAlias = message.util.parsed.alias -- This should work but it's not so I'm writing a workaround
    var usedAlias = message.content.replace(config.prefix, '').split(' ')[0]
    if (usedAlias === ('tag' || 'qr' || 'res')) {
      if (!args.tagAlias) {
        var tagEmbed = new MessageEmbed(embed).setTitle(
          'List of available tags'
        )
        files.forEach(file => {
          if (file.endsWith('.json') && file !== 'template.json') {
            var tagFile = JSON.parse(
              fs.readFileSync(`./src/tags/${file}`, 'utf-8')
            )
            tagEmbed.addField(tagFile.directAliases[0], tagFile.title)
          }
        })
        message.channel.send({ embeds: [tagEmbed] })
      } else {
        files.forEach(file => {
          if (file.endsWith('.json') && file !== 'template.json') {
            var tagFile = JSON.parse(
              fs.readFileSync(`./src/tags/${file}`, 'utf-8')
            )
            if (tagFile.aliases.includes(args.tagAlias)) {
              var tagEmbed = new MessageEmbed(embed).setTitle(tagFile.title)

              if (tagFile.image) tagEmbed.setImage(tagFile.image)
              tagFile.fields.forEach((field: any) => {
                tagEmbed.addField(field.name, field.value, false)
              })

              return message.channel.send({ embeds: [tagEmbed] })
            }
          }
        })
      }
    } else {
      files.forEach(file => {
        if (file.endsWith('.json') && file !== 'template.json') {
          var tagFile = JSON.parse(
            fs.readFileSync(`./src/tags/${file}`, 'utf-8')
          )
          if (tagFile.directAliases.includes(usedAlias)) {
            var tagEmbed = new MessageEmbed(embed).setTitle(tagFile.title)

            if (tagFile.image) tagEmbed.setImage(tagFile.image)
            tagFile.fields.forEach((field: any) => {
              tagEmbed.addField(field.name, field.value, false)
            })

            return message.channel.send({ embeds: [tagEmbed] })
          }
        }
      })
    }
  }
}
