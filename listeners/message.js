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
      const allowedExtensions = ['png', 'jpg', 'gif', 'webp', 'tiff', 'heif', 'jpeg', 'svg', 'webm', 'mpg', 'mpeg', 'ogg', 'mp4', 'm4v', 'avi', 'mov', 'm4a', 'mp3', 'wav']
	    const extension = attachment.name.split('.').pop()
	    return !allowedExtensions.includes(extension)
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
