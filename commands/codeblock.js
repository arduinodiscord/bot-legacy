const { Command } = require('discord-akairo')
const { DataResolver } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')

class CodeBlockCommand extends Command {
  constructor() {
    super('codeblock', {
      aliases: ['codeblock', 'codeblocks', 'code', 'block'],
      description: 'Explains how to post a code block in discord.'
    })
  }

  exec(message) {
    message.channel.send(
      new MessageEmbed(embed)
      .setTimestamp(new Date())
      .setTitle('How to Send Code Blocks')
      .setImage('https://cdn.discordapp.com/attachments/747642578668748800/754151197425795202/unknown.png')
      .setDescription('Surround the code in three backticks. If using new lines, a file extension can be placed directly after the first 3 backticks to highlight in that language. An example is shown below, highlighting code in C++.')
    )
  }
}
module.exports = CodeBlockCommand