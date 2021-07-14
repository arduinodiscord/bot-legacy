import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { embed, config } from '../bot'

export class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', '?'],
      channel: 'guild',
      description: 'Displays the help page.'
    })
  }

  exec(message:any) {
    var helpEmbed = new MessageEmbed(embed)
      .setTitle('Arduino Bot Help')
      .setTimestamp(new Date())

    this.handler.modules.each(module => {
      helpEmbed.addField(`${config.prefix}${module.id}`, module.description, true)
    })
    message.channel.send(helpEmbed)
  }
}
