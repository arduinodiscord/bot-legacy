const Discord = require('discord.js')
const { icon, prefix } = require('@conf/bot.json')

exports.run = (client, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle('Help!')
    .setDescription('**Usage: [optional], (requires), this | or this, "literal text"**')
    .setColor('#00b3b3')
    .setTimestamp(new Date())
    .setFooter(client.footer, icon)
    .addField(`${prefix}help`, 'Displays this help page. I wonder how you got here? 🤔', true)
    .addField(`${prefix}ping`, 'Play ping pong! Just kidding it gives you latency info. Unless... 🏓', true)
    .addField(`${prefix}docs (doc name)`, 'Displays a doc page to provide information for commonly asked questions or topics.')

  message.channel.send(embed)
}
