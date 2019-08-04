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
      .setDescription(`In the meantime, you can look for a moderator in <&420594746990526468>!`)
      .setColor('#00b3b3')
      .setFooter(client.footer, icon)
      .setTimestamp(new Date())
    return message.channel.send(embed)
  }

  if (message.content.startsWith('```') && (message.content.split('\n', 20).length > 15) && message.content.split('\n', 1)[0].includes('```') && message.content.endsWith('```')) {
    let embed = new Discord.RichEmbed()
      .setTitle('Code block detected! Automagically shooting to GitHub...')
      .setDescription('The link will appear right here in just a moment.')
      .setColor('#00b3b3')
      .setFooter(client.footer, icon)
      .setTimestamp(new Date())

    if (message.content.split('\n', 1)[0].slice(3).replace('\n', '').length > 0) {
      var fileExtension = message.content.split('\n', 1)[0].slice(3).replace('\n', '')
      var extensionLength = fileExtension.length
    } else {
      var fileExtension = 'cpp'
      var extensionLength = 0
    }

    var gistContent = message.content.slice(2 + extensionLength + 2, message.content.length - 4)
    var gistObject = {
      "description": `Code by ${message.author.username + '#' + message.author.discriminator} - ${new Date()}`,
      "public": true,
      "files": {
        ["CodeBlockPaste." + fileExtension]: {
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
