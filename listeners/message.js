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
    // File filter
    if (message.attachments.find(attachment => {
      const allowedExtensions = ['png', 'jpg', 'gif', 'webp', 'tiff', 'heif', 'jpeg', 'svg', 'webm', 'mpg', 'mpeg', 'ogg', 'mp4', 'm4v', 'avi', 'mov', 'm4a', 'mp3', 'wav', 'pdf']
      const extension = attachment.name.split('.').pop().toLowerCase()
      return (!allowedExtensions.includes(extension)) && (!message.member.roles.cache.find(role => role.id === '451152561735467018'))
    })) {
      message.delete().then(() => {
        message.channel.send(
          new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle("We don't support file debugging!")
            .setDescription('Please paste your code on a [website](https://gist.github.com) or in a [code block](https://discordapp.com/channels/420594746990526466/549794917036326912/555379356604825610).')
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        )
      }).catch(err => console.error(err))
    }

    // Initial reaction for code block pastes
    if (message.content.includes('```') && message.content.match(/```/g).length >= 2) {
      message.react(config.pasteEmoji).catch(err => console.error(err))
    }

    // Message link flattening
    const messageLinkMatchArray = message.content.match(/https?:\/\/(canary.)?discord\.com\/channels\/\d{18}\/\d{18}\/\d{18}/gm)
    if (messageLinkMatchArray) {
      messageLinkMatchArray.forEach(link => {
        let linkArray = link.split('/')
        linkArray.splice(0, 4)
        if (linkArray[0] === message.guild.id) {
          message.guild.channels.resolve(linkArray[1]).messages.fetch(linkArray[2]).then(msg => {
            message.channel.send(
              new MessageEmbed(embed)
                .setTitle(msg.content)
                .setAuthor(msg.author.tag + ' said:', msg.author.avatarURL({ dynamic: true }))
                .setFooter(`Message link sent by ${message.author.tag}, click original for context.`)
            )
          }).catch(err => {
            console.error(err)
          })
        }
      })
    }

    // Auto-crosspost feed channels
    if ((message.channel.id === '610239559376044043') || (message.channel.id === '610239597317849248') || (message.channel.id === '610253712824467473')) {
      var crosspostLog = message.guild.channels.resolve('801316586371416074')
      if (message.crosspostable) {
        message.crosspost().then(() => {
          crosspostLog.send(
            new MessageEmbed(embed)
              .setTimestamp(new Date())
              .setTitle(`Successfully auto-crossposted in #${message.channel.name}`)
          )
        }).catch(err => {
          console.error(err)
          crosspostLog.send(
            new MessageEmbed(embed)
              .setTimestamp(new Date())
              .setTitle(`Failed to auto-crosspost in #${message.channel.name}`)
              .setDescription('This is likely due to ratelimiting. Check production logs for more information.')
          )
        })
      }
    }
  }
}

module.exports = MessageListener
