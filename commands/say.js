const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')

class SayCommand extends Command {
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
            start: m => {
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
            start: m => {
              return new MessageEmbed(embed)
                .setTitle('What would you like the primary embed title to be?')
            }
          }
        },
        {
          id: 'description',
          type: 'string',
          prompt: {
            start: m => {
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
            start: m => {
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

  exec(message, args) {
    if ((args.fields.length % 2) !== 0) {
      return message.channel.send(
        new MessageEmbed(embed)
          .setTitle('No value was supplied for your final field. Every field must have a name and a value. Cancelling command.')
          .setTimestamp(new Date())
      )
    }
    message.channel.send(
      new MessageEmbed(embed)
        .setTitle('If you would like to add a thumbnail (small in top right), react with ✅. Otherwise react with ❌')
        .setTimestamp(new Date())
    ).then(m => {
      m.react('✅').then(() => {
        m.react('❌').then(() => {
          m.awaitReactions(reaction => reaction.users.resolve(message.author), { time: 300000 }).then(reaction => {
            console.log('first test ' + reaction.emoji.toString())
            if (reaction.emoji.toString() === '✅') {
              message.channel.send(
                new MessageEmbed(embed)
                  .setTitle('What thumbnail would you like to add? Please provide a direct URL.')
                  .setTimestamp(new Date())
              ).then(() => {
                message.channel.awaitMessages(msg => msg.author.id === message.author.id).then(msg => {
                  try {
                    var url = new URL(msg.content)
                  } catch (err) {
                    return message.channel.send(
                      new MessageEmbed()
                        .setTitle('URL provided was invalid. Cancelling command.')
                        .setTimestamp(new Date())
                    )
                  }
                  args.thumbnail = url.toString()
                  sendIt(true)
                })
              })
            } else if (reaction.emoji.toString() === '❌') {
              console.log('second one')
              sendIt(false)
            }
          })
        })
      })
      console.log('test')
    })

    function sendIt(thumbnail) {
      const say = new MessageEmbed(embed)
        .setTimestamp(new Date())
        .setTitle(args.title).setDescription(args.description)
      for (let i = 1; i <= args.fields.length / 2; i++) {
        let name = args.shift()
        let value = args.shift()
        say.addField(name, value)
      }
      if (thumbnail) {
        say.setThumbnail(args.thumbnail)
      }
      message.guild.channels.resolve(args.channel).send(say)
    }
  }
}
module.exports = SayCommand