const { Listener } = require('discord-akairo')
const { version } = require('../package.json')
const cache = require('../utils/cache')
const { MessageEmbed } = require('discord.js')
const { embed, config } = require('../bot')
const { DateTime } = require('luxon')

class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd'
    })
  }

  exec(member) {
    var logChannel = member.guild.channels.resolve(config.channels.joinLeaveLog)
    member.guild.fetchInvites().then(invites => {
      var inviteSource = undefined
      invites.each(invite => {
        if (invite.uses !== cache.getInviteCache(invite.code)) inviteSource = invite
      })

      var inviteEmbed = new MessageEmbed(embed)
        .setTitle("Member joined")
        .setTimestamp(new Date())
        .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
        .setDescription(`#${member.guild.memberCount} to join`)
        .setFooter(`ID: ${member.id}`)

      if (inviteSource) {
        cache.setInviteCache(inviteSource.code, inviteSource.uses)
        logChannel.send(
          inviteEmbed.addField(`Joined with invite code ${inviteSource.code} created by ${inviteSource.inviter.tag}`, `Account created ${DateTime.fromJSDate(member.user.createdAt).toLocaleString()}`)
        )
      } else {
        logChannel.send(
          inviteEmbed.addField(`Joined with unknown invite code. Likely through Server Discovery.`, `Account created ${DateTime.fromJSDate(member.user.createdAt).toLocaleString()}`)
        )
      }
    })
  }
}
module.exports = GuildMemberAddListener