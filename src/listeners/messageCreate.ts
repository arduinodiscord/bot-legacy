import { Listener } from 'discord-akairo'
import { Message, MessageEmbed, TextChannel } from 'discord.js'
import { embed, config } from '../bot'

export default class MessageCreateListener extends Listener {
  constructor() {
    super('messageCreate', {
      emitter: 'client',
      event: 'messageCreate'
    })
  }

  exec(message: Message) {
    // Auto-crosspost feed channels
    if (config.channels.toCrosspost.includes(message.channel.id)) {
      var crosspostLog = message.guild?.channels.resolve(
        config.channels.crosspostLog
      ) as TextChannel
      if (message.crosspostable) {
        message
          .crosspost()
          .then(() => {
            crosspostLog.send({
              embeds: [
                new MessageEmbed(embed)
                  .setTimestamp(new Date())
                  .setTitle(
                    `Successfully auto-crossposted in #${
                      (message.channel as TextChannel).name
                    }`
                  )
              ]
            })
          })
          .catch((err: any) => {
            console.error(err)
            crosspostLog.send({
              embeds: [
                new MessageEmbed(embed)
                  .setTimestamp(new Date())
                  .setTitle(
                    `Failed to auto-crosspost in #${
                      (message.channel as TextChannel).name
                    }`
                  )
                  .setDescription(
                    'This is likely due to ratelimiting. Check production logs for more information.'
                  )
              ]
            })
          })
      }
    }
    if (message.author.bot) return

    // File filter
    if (
      message.attachments.find((attachment: any) => {
        const blockedExtensions = [
          'exe',
          'dll',
          'lnk',
          'swf',
          'sys',
          'scr',
          'bat',
          'ws',
          'bin',
          'com',
          'ocx',
          'drv',
          'class',
          'xnxx',
          'dev',
          'pif',
          'sop',
          'exe1',
          'lik',
          'cih',
          'dyz',
          'osa',
          'scr',
          'bup',
          'vexe',
          'oar'
        ]
        const extension = attachment.name.split('.').pop().toLowerCase()
        return (
          blockedExtensions.includes(extension) &&
          !message.member?.roles.cache.find(
            (role: any) => role.id === '451152561735467018'
          )
        )
      })
    ) {
      message
        .delete()
        .then(() => {
          message.channel.send({
            embeds: [
              new MessageEmbed(embed)
                .setTimestamp(new Date())
                .setTitle('That filetype is not allowed.')
                .setDescription(
                  'Please DM <@799678733723893821> for more information.'
                )
                .setAuthor(
                  message.author.tag,
                  message.author.avatarURL({ dynamic: true }) || ''
                )
            ]
          })
        })
        .catch((err: any) => {
          console.log(
            'Error occurred after deleting banned file attachment type.'
          )
          console.error(err)
        })
    }

    // Message link flattening
    const messageLinkMatchArray = message.content.match(
      /https?:\/\/(canary.)?discord\.com\/channels\/\d{18}\/\d{18}\/\d{18}/gm
    )
    if (messageLinkMatchArray) {
      messageLinkMatchArray.forEach((link: any) => {
        let linkArray = link.split('/')
        linkArray.splice(0, 4)
        if (linkArray[0] === message.guild?.id) {
          ;(
            message.guild?.channels.resolve(linkArray[1]) as TextChannel
          ).messages
            .fetch(linkArray[2])
            .then((msg: any) => {
              message.channel.send({
                embeds: [
                  new MessageEmbed(embed)
                    .setTitle(msg.content)
                    .setAuthor(
                      msg.author.tag + ' said:',
                      msg.author.avatarURL({ dynamic: true })
                    )
                    .setFooter(
                      `Message link sent by ${message.author.tag}, click original for context.`
                    )
                ]
              })
            })
            .catch((err: any) => {
              console.error(err)
            })
        }
      })
    }
  }
}
