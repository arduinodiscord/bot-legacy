import { Command, Inhibitor} from 'discord-akairo'
import { Message } from 'discord.js'
import { config } from '../bot'

export default class StaffRequiredInhibitor extends Inhibitor {
  constructor() {
    super('staffRequired', {
      reason: 'staffRoleRequired',
      type: 'post'
    })
  }

  exec(message: Message, command:Command) {
    if(!message.guild) throw "Message Guild not found"

    let member = message.guild.members.cache.find(member => member.id === message.author.id)

    var roleAbsent = (roleId:any) => {
      if(!member) throw "Can't find member";

      return !!member.roles.cache.find(role => role.id === roleId);
    }

    if (command.id === "gist") {
      return roleAbsent(config.roles.helper)
    } else {
      return roleAbsent(config.roles.staff)
    }
  }
}