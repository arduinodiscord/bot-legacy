const Discord = require('discord.js')

const { prefix } = require('@conf/bot.json')

module.exports = (client, message) => {
  if (message.author.bot)
    return

  if (message.channel.type === 'dm') {
    new Discord.RichEmbed()
      .setTitle(`**Mod Mail is coming soon!**`)
      .setDescription(`In the meantime, you can look for a moderator in <&420594746990526468>!`)
      .setColor('#00b3b3')
      .setFooter(bot.footer)
      .setTimestamp(new Date())

    return message.channel.send(embed)
  }

  if (message.content.indexOf(prefix) !== 0) return

  const args = message.content.slice(1).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = client.commands.get(command)

  if (!cmd)
    return

  cmd.run(client, message, args)
}
