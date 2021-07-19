import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { embed } from '../bot'

export class SayCommand extends Command {
  constructor() {
    super('say', {
      aliases: ['say'],
      description: '(For admins) Have the bot say something as an embed.',
      channel: 'guild',
      userPermissions: 'ADMINISTRATOR',
      argumentDefaults: {
        prompt: {
          time: 1200000
        }
      },
      args: [
        {
          id: 'channel',
          type: 'channel',
          prompt: {
            start: (m:any) => {
              return new MessageEmbed(embed)
                .setTitle('What channel would you like the message sent in?')
                .setTimestamp(new Date())
            }
          }
        },
        {
          id: 'title',
          type: 'string',
          prompt: {
            start: (m:any) => {
              return new MessageEmbed(embed)
                .setTitle('What would you like the primary embed title to be?')
            }
          }
        },
        {
          id: 'description',
          type: 'string',
          prompt: {
            start: (m:any) => {
              return new MessageEmbed(embed)
                .setTitle('What would you like the primary embed description to be?')
            }
          }
        },
        {
          id: 'fields',
          type: 'string',
          prompt: {
            infinite: true,
            stopWord: 'done',
            start: (m:any) => {
              return new MessageEmbed(embed)
                .setTitle('What fields would you like to send? **Read below!!**')
                .setDescription('Please send **separate** messages alternating between the new field title and the new field value. Add as many fields as you want, and when you are ready to go to the next step, send the message "`done`". You have 20 minutes to complete this step.')
                .setTimestamp(new Date())
            }
          }
        }
      ]
    })
  }

  exec(message:any, args:any) {
    if ((args.fields.length % 2) !== 0) {
      return message.channel.send(
        new MessageEmbed(embed)
          .setTitle('No value was supplied for your final field. Every field must have a name and a value. Canceling command.')
          .setTimestamp(new Date())
      )
    }
    message.channel.send(
      new MessageEmbed(embed)
        .setTitle('If you would like to add a thumbnail (small in top right), react with ✅. Otherwise react with ❌')
        .setTimestamp(new Date())
    ).then((m:any) => {
      m.react('✅').then(() => {
        m.react('❌').then(() => {
          m.awaitReactions((reaction:any, user:any) => user === message.author, { max: 1, time: 300000 }).then((reactionCollection:any) => {
            let reaction = reactionCollection.first()
            if (reaction.emoji.toString() === '✅') {
              message.channel.send(
                new MessageEmbed(embed)
                  .setTitle('What thumbnail would you like to add? Please provide a direct URL.')
                  .setTimestamp(new Date())
              ).then(() => {
                message.channel.awaitMessages((msg:any) => msg.author === message.author, { max: 1, time: 300000}).then((msgCollector:any) => {
                  let msg = msgCollector.first()
                  try {
                    var url = new URL(msg.content)
                  } catch (err) {
                    return message.channel.send(
                      new MessageEmbed(embed)
                        .setTitle('URL provided was invalid. Canceling command.')
                        .setTimestamp(new Date())
                    )
                  }
                  args.thumbnail = url.toString()
                  sendIt(true)
                })
              })
            } else if (reaction.emoji.toString() === '❌') {
              sendIt(false)
            }
          })
        })
      })
    })

    function sendIt(thumbnail:any) {
      const say = new MessageEmbed(embed)
        .setTimestamp(new Date())
        .setTitle(args.title).setDescription(args.description)

      // And that's on spending an hour realizing you can't iterate over an array you're modifying
      const iterableLength = args.fields.length

      for (let i = 0; i < iterableLength / 2; i++) {
        let name = args.fields.shift()
        let value = args.fields.shift()
        say.addField(name, value)
      }
      if (thumbnail) {
        say.setThumbnail(args.thumbnail)
      }
      message.guild.channels.resolve(args.channel).send(say).then(() => {
        message.channel.send(
          new MessageEmbed(embed)
          .setTimestamp(new Date())
          .setTitle('Great success!')
          .setDescription('Embed sent.')
        )
      }).catch((err:any) => {
        message.channel.send(
          new MessageEmbed(embed)
          .setTimestamp(new Date())
          .setTitle('An error occured whilst trying to send.')
          .setDescription('Error: ' + err)
        )
      })
    }
  }
}