const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const stringSimilarity = require('string-similarity')
const { embed, config } = require('../bot')

class MessageListener extends Listener {
  constructor() {
    super('message', {
      emitter: 'client',
      event: 'message'
    })
  }

  exec(message) {
    if (message.author.bot) return
    // Duplicates filter
    for (var i = 0; i < config.channels.preventDuplicates.length; i++) {
      var channelID = config.channels.preventDuplicates[i]
      if (message.channel.id === channelID) continue
      var channel = message.guild.channels.resolve(channelID)
      var original = channel.messages.cache.find(msg => {
        // Conditions to flag message as duplicate
        return (stringSimilarity.compareTwoStrings(msg.content, message.content) >= 0.9) && (msg.content.length >= 10) && (message.author === msg.author)
      })

      if (original) {
        message.delete()

        // DM offender
        var dmMessage = new MessageEmbed(embed)
          .setTitle("We've detected that you sent a duplicate message in multiple channels.")
          .setDescription("This is against our rules, please refrain from crossposting duplicate messages in the future. If you believe this message was sent in error, please DM <@799678733723893821> with valid reasoning.")
          .setTimestamp(new Date())
        if (message.author.dmChannel) {
          message.author.dmChannel.send(dmMessage)
        } else {
          message.author.createDM().then(dmChannel => {
            dmChannel.send(dmMessage)
          })
        }

        // Post to mod log
        message.guild.channels.resolve(config.channels.moderationLog).send(
          new MessageEmbed(embed)
            .setTitle("Duplicate Crosspost Detected")
            .addField("Offender", message.author.tag, true)
            .addField("Channel", message.channel.toString())
            .addField("Similarity", `${Math.floor(stringSimilarity.compareTwoStrings(original.content, message.content) * 10000) / 100}%`, true)
            .setTimestamp(new Date())
        )
        break
      }
    }

    // File filter
    if (message.attachments.find(attachment => {
      const blockedExtensions = ['exe', 'dll', 'lnk', 'swf', 'sys', 'scr', 'bat', 'ws', 'bin', 'com', 'ocx', 'drv', 'class', 'xnxx', 'dev', 'pif', 'sop', 'exe1', 'lik', 'cih', 'dyz', 'osa', 'scr', 'bup', 'vexe', 'oar']
      const extension = attachment.name.split('.').pop().toLowerCase()
      return (blockedExtensions.includes(extension)) && (!message.member.roles.cache.find(role => role.id === '451152561735467018'))
    })) {
      message.delete().then(() => {
        message.channel.send(
          new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle("That filetype is not allowed.")
            .setDescription('Please DM <@799678733723893821> for more information.')
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        )
      }).catch(err => {
        console.log("Error occurred after deleting banned file attachment type.")
        console.error(err)
      })
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
    if (config.channels.toCrosspost.includes(`${message.channel.id}`)) {
      var crosspostLog = message.guild.channels.resolve(config.channels.crosspostLog)
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
