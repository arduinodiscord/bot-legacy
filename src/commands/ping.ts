import { Command } from 'discord-akairo'
import { config } from '../bot'

export class PingCommand extends Command {
  constructor () {
    super('ping', {
      aliases: ['ping', 'ms'],
      channel: 'guild',
      description: 'Get the latency of the bot.'
    })
  }

  exec (message:any) {
    const pingInit = {
      title: 'Pinging...',
      color: '#00b3b3',
      timestamp: new Date(),
      footer: {
        text: config.embeds.footer
      }
    }
    const pingEmbed = this.client.util.embed(pingInit)
    message.channel.send(pingEmbed).then((m:any) => {
      const newPingEmbed = this.client.util.embed({
        ...pingInit,
        title: `Pong! Round-trip latency is ${m.createdTimestamp - message.createdTimestamp}ms. API latency is ${Math.round(this.client.ws.ping)}ms.`
      })
      m.edit(newPingEmbed)
    })
  }
}
