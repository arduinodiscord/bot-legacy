import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { config, embed } from '../bot'

export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping', 'ms'],
      channel: 'guild',
      description: 'Get the latency of the bot.'
    })
  }

  exec(message: any) {
    const pingEmbed = new MessageEmbed(embed)
      .setTitle('Pinging...')
      .setTimestamp(new Date())
    message.channel.send({ embeds: [pingEmbed] }).then((m: any) => {
      m.edit({
        embeds: [
          new MessageEmbed(embed)
            .setTitle(
              `Pong! Round-trip latency is ${
                m.createdTimestamp - message.createdTimestamp
              }ms. API latency is ${Math.round(this.client.ws.ping)}ms.`
            )
            .setTimestamp(new Date())
        ]
      })
    })
  }
}
