const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')

class SetAvatarCommand extends Command {
  constructor() {
    super('setavatar', {
      aliases: ['setavatar', 'setpicture'],
      description: "(For admins) Sets the bot's profile picture.",
      userPermissions: 'ADMINISTRATOR',
      args: [
        {
          id: 'url',
          type: 'url'
        }
      ]
    })
  }

  exec(message, args) {
    this.client.user.setAvatar(args.url).then(() => {
      message.channel.send(new MessageEmbed(embed)
      .setTitle('Success')
      .setTimestamp(new Date())
      )
    })
  }
}
module.exports = SetAvatarCommand