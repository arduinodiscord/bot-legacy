const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')
const config = require('../config.json')

class MessageListener extends Listener {
  constructor() {
    super('message', {
      emitter: 'client',
      event: 'message'
    })
  }

  exec(message) {
    if (message.attachments.find(attachment => {
      let name = attachment.name.toLowerCase()
      return !name.endsWith('.png') && !name.endsWith('.jpg') && !name.endsWith('.gif') && !name.endsWith('.webp') && !name.endsWith('.tiff') && !name.endsWith('.heif') && !name.endsWith('.jpeg') && !name.endsWith('.svg') && !name.endsWith('.webm') && !name.endsWith('.mpg') && !name.endsWith('.mpeg') && !name.endsWith('.ogg') && !name.endsWith('.mp4') && !name.endsWith('.m4v') && !name.endsWith('.avi') && !name.endsWith('.mov') && !name.endsWith('.m4a') && !name.endsWith('.mp3') && !name.endsWith('.wav')
    })) {
      message.delete().then(() => {
        message.channel.send(
          new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle("We don't support file debugging!")
            .setDescription('Please paste your code on a [website](https://gist.github.com) or in a [code block](https://discordapp.com/channels/420594746990526466/549794917036326912/555379356604825610).')
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        )
      })
    }
    if (message.content.includes('```') && message.content.match(/```/g).length >= 2) {
      message.react(config.pasteEmoji)
    }
  }
}
module.exports = MessageListener