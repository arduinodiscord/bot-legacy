const Discord = require('discord.js')
const { icon, prefix } = require('@conf/bot.json')
const fs = require('fs')

exports.run = (client, message, args) => {
  message.channel.startTyping()
  if (args.length === 0) {
    var embed = new Discord.RichEmbed()
      .setTitle('This command requires arguments!')
      .setDescription(`Unsure what to input? Do ${prefix}help for more info!`)
      .setColor('#00b3b3')
      .setTimestamp(new Date())
      .setFooter(client.footer, icon)
      .setThumbnail()

    message.channel.send(embed)
    message.channel.stopTyping(true)
  } else {
    var preEmbed = new Discord.RichEmbed()
      .setAuthor('Arduino Bot Docs - Contribute on GitHub!', 'https://i.imgur.com/g8wv43V.png')
      .setTitle("I'm searching for that doc...")
      .setDescription('Patience is the companion of wisdom - Saint Augustine')
      .setColor('#00b3b3')
      .setTimestamp(new Date())
      .setFooter(client.footer, icon)
    message.channel.send(preEmbed).then(m => {
      // Begin Search
      fs.readdir('./docs', (err, files) => {
        if (err) return console.error(new Error(err))
        var foundDoc = false
        files.forEach(file => {
          if (!file.endsWith('.json')) return
          var actualFile = require('../docs/' + file)
          var aliases = actualFile.aliases.map(el => { return el.toUpperCase() })
          if (file.toUpperCase().startsWith(args[0].toUpperCase()) || aliases.includes(args[0].toUpperCase())) {
            var docEmbed = new Discord.RichEmbed()
              .setAuthor('Arduino Bot Docs - Contribute on GitHub!', 'https://i.imgur.com/g8wv43V.png')
              .setTitle(actualFile.title)
              .setDescription(actualFile.description)
              .setColor('#00b3b3')
              .setTimestamp(new Date())
              .setFooter(client.footer, icon)
              .setImage(actualFile.image)

            actualFile.content.forEach(entry => {
              var field = entry.split('|')
              docEmbed.addField(field[0], field[1], true)
            })
            m.edit(docEmbed)
            foundDoc = true
            message.channel.stopTyping(true)
          }
        })
        if (!foundDoc) {
          var embed = new Discord.RichEmbed()
            .setTitle('No docs with that name were found!')
            .setDescription(`Unsure what to input? Do ${prefix}help for more info!`)
            .setColor('#00b3b3')
            .setTimestamp(new Date())
            .setFooter(client.footer, icon)
            .setThumbnail()

          m.edit(embed)
          message.channel.stopTyping(true)
        }
      })
    })
  }
}
