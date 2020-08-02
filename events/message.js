const Discord = require('discord.js')
const { icon } = require('@conf/bot.json')
const Gists = require('gists')
const gists = new Gists({
  token: process.env.GITHUB_TOKEN
})

const { prefix } = require('@conf/bot.json')

module.exports = (client, message) => {
  if (message.author.bot) return

  if (message.channel.type === 'dm') {
    var embed = new Discord.RichEmbed()
      .setTitle(`**Mod Mail is Coming Soon!**`)
      .setDescription(`In the meantime, you can look for a moderator in <&556594862502182914>!`)
      .setColor('#00b3b3')
      .setFooter(client.footer, icon)
      .setTimestamp(new Date())
    return message.channel.send(embed)
  }

  message.attachments.array().forEach(attachment => {
    if ((attachment.filename.endsWith(".ino")) || (attachment.filename.endsWith(".txt")) || (attachment.filename.endsWith(".zip")) || (attachment.filename.endsWith(".rar")) || (attachment.filename.endsWith(".pdf"))) {
      let attachmentEmbed = new Discord.RichEmbed()
        .setTitle("We don't support file debugging!")
        .setDescription('Please paste your code on a [website](https://gist.github.com) or in a [code block](https://discordapp.com/channels/420594746990526466/549794917036326912/555379356604825610).')
        .setColor('#00b3b3')
        .setFooter(client.footer, icon)
        .setAuthor(`${message.author.username + '#' + message.author.discriminator}`, message.author.avatarURL)
        .setTimestamp(new Date())
      message.channel.send(attachmentEmbed)
      return message.delete()
    }
  })

  if ((message.content.startsWith('```') && message.content.endsWith('```')) && ((message.content.split('\n', 26).length >= 25) || (!message.content.includes('\n')))) {
    let embed = new Discord.RichEmbed()
      .setTitle('Code block detected! Automagically shooting to GitHub...')
      .setDescription('The link will appear right here in just a moment.')
      .setColor('#00b3b3')
      .setFooter(client.footer, icon)
      .setAuthor(`${message.author.username + '#' + message.author.discriminator}`, message.author.avatarURL)
      .setTimestamp(new Date())

    var headermessage = '## This Gist was created by the Arduino discord server bot.'
    var robot = '##### *This message was created automatically.*'
    var badges = '[![](https://img.shields.io/github/issues/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/issues) [![](https://img.shields.io/github/forks/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/stars/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/license/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/blob/master/LICENSE) [![](https://user-images.githubusercontent.com/7288322/34429152-141689f8-ecb9-11e7-8003-b5a10a5fcb29.png)](http://arduino.cc/discord)'
    var alertMessage = '> **This gist was automatically created to keep the help channels in the Arduino discord server clean. If you have any suggestions or bugs to report, you can do so on our [GitHub](https://github.com/BluLightShow/arduino-bot/ "GitHub page") repository, or in our discord server. This project is run by volunteers so feel free to fork and commit your changes then open a pull request!**'
    var linebreak = '------------'
    var code = '# ⬇️ Pasted Code ⬇️'

    var gistContent = message.content.slice(3, message.content.length - 3).replace('cpp', '')
    var gistObject = {
      "description": `Code by ${message.author.username + '#' + message.author.discriminator} - ${new Date()}`,
      "public": true,
      "files": {
        "Arduino.md": {
          "content": `${headermessage}\n${robot}\n${badges}\n${alertMessage}\n${linebreak}\n${code}`
        },
        "CodeBlockPaste.cpp": {
          "content": gistContent
        }
      }
    }
    message.channel.send(embed).then(m => {
      gists.create(gistObject).then(gist => {
        embed.setTitle('Code block pasted to github! Removing the original message...')
        embed.setDescription(`**${gist.body.html_url}**`)
        embed.setColor('#00b3b3')
        embed.setFooter(client.footer, icon)
        embed.setTimestamp(new Date())
        m.edit(embed)

        message.delete().then(() => {
          embed.setTitle('Code block pasted to github! The original message is deleted, you can access the code with the link below:')
          return m.edit(embed)
        }).catch(err => {
          return console.log(err)
        })
      })
    }).catch(err => {
      console.error(err)

      embed.setTitle('There was an error while processing your code block and sending it to GitHub.')
      embed.setDescription('**Please report this to the server moderators!**')
      embed.setColor('#00b3b3')
      embed.setFooter(client.footer, icon)
      embed.setTimestamp(new Date())
      return m.edit(embed)
    })
  }

  if (message.content.indexOf(prefix) !== 0) return

  const args = message.content.slice(1).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command)
  if (!cmd) return
  cmd.run(client, message, args)
}
