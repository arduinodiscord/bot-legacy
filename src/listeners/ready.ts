const { Listener } = require('discord-akairo')
const { version } = require('../package.json')
const { config } = require('../bot')
const cache = require('../utils/cache')

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  exec() {
    console.log(`Logged into account: ${this.client.user.tag}`)

    var guild = this.client.guilds.resolve(config.guild)

    guild.fetchInvites().then(invites => {
      invites.each(invite => {
        cache.setInviteCache(invite.code, invite.uses)
      })
    }).then(() => {
      console.log("Invite cache has been filled.")
    })

    console.log(`Arduino Bot ${version} ready for battle!`)
  }
}
module.exports = ReadyListener