const { Listener } = require('discord-akairo')
const { version } = require('../package.json')

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  exec() {
    console.log(`Arduino Bot ${version} ready for battle!`)
  }
}
module.exports = ReadyListener