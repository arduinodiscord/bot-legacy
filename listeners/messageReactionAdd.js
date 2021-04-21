const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const Gists = require('gists')
const { embed } = require('../bot')
const config = require('../config.json')

const gists = new Gists({
  token: process.env.GITHUB_TOKEN
})

class MessageReactionAddListener extends Listener {
  constructor() {
    super('messageReactionAdd', {
      emitter: 'client',
      event: 'messageReactionAdd'
    })
  }

  exec(reaction, user) {
    if (user.bot) return


    if (reaction.emoji.id === config.pasteEmoji && reaction.me) {
      if (user.id === reaction.message.author.id || reaction.message.guild.members.resolve(user.id).roles.cache.find(role => role.id === config.roles.helper)) {
        let message = reaction.message
        let content = message.content

        let numberOfSeparators = message.content.match(/```/g).length

        let array = content.slice(content.indexOf('```'), content.length).split('```')
        let currentCodeBlock = 0
        let files = {
          "ArduinoDiscordBot.md": {
            "content": `## This gist was pasted by the Arduino discord server bot.
            \n[![](https://img.shields.io/github/issues/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/issues) [![](https://img.shields.io/github/forks/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/stars/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/license/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/blob/master/LICENSE) [![](https://img.shields.io/discord/420594746990526466?color=%237289DA&label=%20Discord%20&logo=discord&logoColor=%23FFFFFF)](https://arduino.cc/discord)
            \n> **This gist was automatically pasted at the request of the code author or one of the discord server helpers. If you have any suggestions or bugs to report, you can do so on our [GitHub](https://github.com/BluLightShow/arduino-bot/ "GitHub page") repository, or in our discord server. This project is run by volunteers so feel free to fork and commit your changes then open a pull request!**
            \n------------
            \n# ⬇️ Pasted Code ⬇️`
          }
        }
        for (let i = 0; i <= numberOfSeparators; i++) {
          if (i % 2 !== 0) {
            currentCodeBlock++
            files = {
              ...files,
              [`CodeBlock-${currentCodeBlock}.cpp`]: {
                "content": array[i]
              }
            }
          }
        }
        gists.create({
          "description": `Code by ${message.author.tag} - ${new Date()}`,
          "public": true,
          "files": { ...files }
        }).then(gist => {
          message.channel.send(
            new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle('Requested code block was successfully pasted to gist!')
            .setDescription(`**${gist.body.html_url}**`)
            .setAuthor(`Code by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .addField('Paste requested by:', user.tag, true)
            ).then(() => {
              message.delete().catch(err => {
                console.error(err)
                console.log("Error occurred deleting original after reaction paste.")
              })
            })
        })
      } else {
        reaction.users.remove(user)
      }
    }
  }
}
module.exports = MessageReactionAddListener