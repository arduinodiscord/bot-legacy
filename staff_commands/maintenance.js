const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed, enableMaintenance, disableMaintenance } = require('../bot')
var maintenanceEnabled = false

class MaintenanceCommand extends Command {
  constructor() {
    super('maintenance', {
      aliases: ['maintenance'],
      description: '(For admins) Toggle bot maintenance mode.',
      channel: 'guild',
      userPermissions: 'ADMINISTRATOR',
    })
  }

  exec(message, args) {
    if (maintenanceEnabled) {
      disableMaintenance()
      maintenanceEnabled = false
      message.channel.send(
        new MessageEmbed(embed)
        .setTitle('Maintenance is now disabled.')
        .setTimestamp(new Date())
      )
    } else {
      enableMaintenance()
      maintenanceEnabled = true
      message.channel.send(
        new MessageEmbed(embed)
        .setTitle('Maintenance is now enabled.')
        .setTimestamp(new Date())
      )
    }
  }
}
module.exports = MaintenanceCommand