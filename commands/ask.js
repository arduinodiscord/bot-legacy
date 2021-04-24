const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')

class AskCommand extends Command {
    constructor() {
        super('ask', {
            aliases: ['ask', 'justask'],
            channel: 'guild',
            description: 'prints the iconic "dont ask to ask" message.'
        })
    }
    exec(message) {
        var askEmbed = new MessageEmbed(embed)
        .setTitle('Don\'t ask to ask - Just ask!')
        .setTimestamp(new Date())
  
        askEmbed.addField("describe what your code/hardware does and what you want it to do instead. sharing is caring! share your code, use !code to learn how.", "keep in mind: no one here is paid to help you, so the least you can do is to refine your question in a proper language.")
      
      message.channel.send(askEmbed)
    }
}
module.exports = AskCommand