const { Listener } = require('discord-akairo')
const { version } = require('../package.json')
const { config } = require('../bot')
const cache = require('../utils/cache')

class InviteCreateListener extends Listener {
  constructor() {
    super('inviteCreate', {
      emitter: 'client',
      event: 'inviteCreate'
    })
  }

  exec(invite) {
    cache.setInviteCache(invite.code, 0)
  }
}
module.exports = InviteCreateListener