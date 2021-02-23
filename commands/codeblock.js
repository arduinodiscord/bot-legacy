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
      .setImage('https://cdn.discordapp.com/attachments/758046379133239407/813767505000398929/rllpwo.png')
      .setDescription('Surround the code in three backticks. If using new lines, a file extension can be placed directly after the first 3 backticks to highlight in that language. An example is shown below, highlighting code in C++. The backtick key is typically found to the left of the 1 key.')
    )
  }
}
module.exports = CodeBlockCommand