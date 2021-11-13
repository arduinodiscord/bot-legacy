import { Listener } from 'discord-akairo'
import { version } from '../../package.json'
import { config, embed } from '../bot'
import * as cache from '../utils/cache'
import { ButtonInteraction, CommandInteraction, Interaction, MessageEmbed } from 'discord.js'

export default class InteractionListener extends Listener {
  public constructor() {
    super('interactionCreate', {
      emitter: 'client',
      event: 'interactionCreate'
    })
  }

  public exec(interaction: any) {
    if (interaction.isButton() && (interaction.message.id === config.specialMessages.roleSelect)) {
      var member = interaction.member
      if (interaction.customId === 'events') {
        if (member.roles.cache.get(config.roles.eventNotifsOptin)) {
          member.roles.remove(config.roles.eventNotifsOptin)

          interaction.reply({ ephemeral: true, embeds: [
            new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle('✅ The event notification role was succesfully removed.')
          ] })
        } else {
          member.roles.add(config.roles.eventNotifsOptin)

          interaction.reply({ ephemeral: true, embeds: [
            new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle('✅ The event notification role was succesfully added.')
          ] })
        }
      } else if (interaction.customId === 'server_updates') {
        if (member.roles.cache.get(config.roles.serverUpdateNotifsOptin)) {
          member.roles.remove(config.roles.serverUpdateNotifsOptin)

          interaction.reply({ ephemeral: true, embeds: [
            new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle('✅ The server update notification role was succesfully removed.')
          ] })
        } else {
          member.roles.add(config.roles.serverUpdateNotifsOptin)

          interaction.reply({ ephemeral: true, embeds: [
            new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle('✅ The server update notification role was succesfully added.')
          ] })
        }
      }
    }
  }
}
