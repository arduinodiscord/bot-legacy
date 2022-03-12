import { Guild, Message, MessageEmbed, TextChannel } from 'discord.js'
import { config, embed } from '../bot'

var masterList: Array<string> = []

// Check message against master list of spam phrases
var checkMessage = (message: Message, guild: Guild): boolean => {
  let positives: Array<string> = []
  masterList.forEach((check) => {
    if (message.content.toLowerCase().includes(check)) {
      positives.push(check)
    }
  })
  if (positives.length > 0) {
    executeResponse(message, guild, positives)
    return true
  } else {
    return false
  }
}

// Respond to positive find from check
var executeResponse = (
  message: Message,
  guild: Guild,
  check: Array<string>
): void => {
  message.delete()
  var channel = guild.channels.resolve(config.channels.moderationLog)
  if (channel.isText()) {
    channel.send({
      embeds: [
        new MessageEmbed(embed)
          .setTimestamp(new Date())
          .setAuthor(message.author.tag, <string>message.author.avatarURL({ dynamic: true }))
          .setTitle(`A message was deleted for including one or more phrases on the primary global filter`)
          .addField('First Hit', check[0])
      ]
    })
  }
}
export { checkMessage as checkMessage }
