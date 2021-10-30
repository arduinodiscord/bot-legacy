import { Listener } from 'discord-akairo'
import { version } from './../../package.json'
import { config } from '../bot'
import * as cache from './../utils/cache'

export default class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  exec() {
    if (!this.client || !this.client.user)
      throw 'Client or user is not initialized'

    console.log(`Logged into account: ${this.client.user.tag}`)

    let guild = this.client.guilds.resolve(config.guild)

    if (!guild) throw 'Guild not found'

    guild.invites
      .fetch()
      .then((invites) => {
        invites.each((invite) => {
          cache.setInviteCache(invite.code, invite.uses)
        })
      })
      .then(() => {
        console.log('Invite cache has been filled.')
      })

    console.log(`Arduino Bot ${version} ready for battle!`)
  }
}
