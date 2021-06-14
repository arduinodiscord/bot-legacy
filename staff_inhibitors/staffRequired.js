const { Inhibitor } = require('discord-akairo')
const { config } = require('../bot')

class StaffRequiredInhibitor extends Inhibitor {
  constructor() {
    super('staffRequired', {
      reason: 'staffRoleRequired',
      type: 'post'
    })
  }

  exec(message, command) {
    let member = message.guild.members.cache.find(member => member.id === message.author.id)

    var roleAbsent = roleId => {
      if (member.roles.cache.find(role => role.id === roleId)) {
        return false
      } else {
        return true
      }
    }
    if (command.id === "gist") {
      return roleAbsent(config.roles.helper)
    } else {
      return roleAbsent(config.roles.staff)
    }
  }
}
module.exports = StaffRequiredInhibitor