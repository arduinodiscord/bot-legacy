const Discord = require('discord.js')

exports.run = (client, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle('Retrieving your pong...')
    .setColor('#00b3b3')
    .setTimestamp(new Date())
  message.channel.send(embed).then(m => {
    let embed = new Discord.RichEmbed()
      .setTitle(`🏓 Pong! Round-trip latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`)
    m.edit(embed)
  })

}