const Discord = require('discord.js')
const Gists = require('gists')
const gists = new Gists({
  token: process.env.GITHUB_TOKEN
})

const { prefix } = require('@conf/bot.json')

module.exports = (client, message) => {
  if (message.author.bot) return

  if (message.channel.type === 'dm') {
    new Discord.RichEmbed()
      .setTitle(`**Mod Mail is Coming Soon!**`)
      .setDescription(`In the meantime, you can look for a moderator in <&420594746990526468>!`)
      .setColor('#00b3b3')
      .setFooter(client.footer)
      .setTimestamp(new Date())

    return message.channel.send(embed)
  }

  if (message.content.startsWith('```') && message.content.endsWith('```')) {
    let embed = new Discord.RichEmbed()
      .setTitle('Code block detected! Automagically shooting to GitHub...')
      .setDescription('The link will appear right here in just a moment.')
      .setColor('#00b3b3')
      .setFooter(client.footer)
      .setTimestamp(new Date())

    message.channel.send(embed).then(m => {
      gists.create({
        "description": `Code by ${message.author.username + '#' + message.author.discriminator} - ${new Date()}`,
        "public": true,
        "files": {
          "Code Block Paste": {
            "content": message.content.slice(3, message.content.length - 4)
          }
        }
      }).then(gist => {
        embed.setTitle('Code block detected! Automagically shooting to GitHub...')
        embed.setDescription(`**${gist.body.html_url}**`)
        embed.setColor('#00b3b3')
        embed.setFooter(client.footer)
        embed.setTimestamp(new Date())

        m.edit(embed)
      })
    })
  }

  if (message.content.indexOf(prefix) !== 0) return

  const args = message.content.slice(1).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = client.commands.get(command)

  if (!cmd) return

  cmd.run(client, message, args)
}
