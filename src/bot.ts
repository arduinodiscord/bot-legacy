import { config as envConfig } from 'dotenv'
envConfig()

import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} from 'discord-akairo'
import * as Discord from 'discord.js'
import { version } from '../package.json'

let localConfig: any
const devLocation = '../config-dev.json'
const prodLocation = '../config-prod.json'

console.log('Attempting to use development config...')
import(devLocation)
  .then((configDev) => {
    localConfig = configDev
    initilize()
  })
  .catch((err) => {
    console.log(err)
    console.log('Failed to find development config...trying production...')
    import(prodLocation)
      .then((configProd) => {
        localConfig = configProd
        initilize()
      })
      .catch((err) => {
        console.log(err)
        console.log(
          'Failed to load a production config...missing config file? Stopping.'
        )
        process.exit()
      })
  })

let embedExport: Discord.MessageEmbed
let enableMaintenanceExport: Function
let disableMaintenanceExport: Function
function initilize() {
  // Dumping Current Configuration
  console.log(`[CONFIG] Prefix: ${localConfig.prefix}`)
  console.log(`[CONFIG] Guild: ${localConfig.guild}`)

  const embed = new Discord.MessageEmbed()
    .setFooter(localConfig.embeds.footer)
    .setColor(localConfig.embeds.color)

  class MainClient extends AkairoClient {
    public commandHandler: CommandHandler = new CommandHandler(this, {
      directory: './build/src/commands/',
      prefix: localConfig.prefix,
      defaultCooldown: 5000,
      commandUtil: true
    })

    public staffComandHandler = new CommandHandler(this, {
      directory: './build/src/staff_commands/',
      prefix: localConfig.staffPrefix,
      defaultCooldown: 1000,
      commandUtil: true
    })

    public staffInhibitorHandler = new InhibitorHandler(this, {
      directory: './build/src/staff_inhibitors/'
    })

    public listenerHandler = new ListenerHandler(this, {
      directory: './build/src/listeners'
    })

    public constructor() {
      super(
        {
          ownerID: localConfig.owners
        },
        {
          presence: {
            status: 'online',
            activities: [
              {
                name: `${localConfig.prefix}help | ${version}`,
                type: 'WATCHING'
              }
            ]
          },
          intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'DIRECT_MESSAGES', 'GUILD_INTEGRATIONS', 'GUILD_MEMBERS']
        }
      )

      // Main Handlers
      this.commandHandler.useListenerHandler(this.listenerHandler)
      this.listenerHandler.loadAll()
      this.commandHandler.loadAll()

      // Staff Handlers
      this.staffComandHandler.useInhibitorHandler(this.staffInhibitorHandler)
      this.staffComandHandler.loadAll()
      this.staffInhibitorHandler.loadAll()
    }
  }
  const client = new MainClient()

  function enableMaintenance() {
    if (!client.user) throw 'Client User not initilized'
    client.commandHandler.removeAll()
    client.listenerHandler.removeAll()
    client.user.setPresence({
      status: 'dnd',
      activities: [{
        name: `Offline - Back soon!`,
        type: 'WATCHING'
      }]
    })
  }

  function disableMaintenance() {
    if (!client.user) throw 'Client User not initilized'
    client.commandHandler.loadAll()
    client.listenerHandler.loadAll()
    client.user.setPresence({
      status: 'online',
      activities: [{
        name: `${localConfig.prefix}help | ${version}`,
        type: 'WATCHING'
      }]
    })
  }

  if (localConfig.token) {
    console.log('Logging in via config token...')
    client.login(localConfig.token)
  } else {
    console.log('Logging in via environment token...')
    client.login(process.env.BOT_TOKEN)
  }

  embedExport = embed
  enableMaintenanceExport = enableMaintenance
  disableMaintenanceExport = disableMaintenance
}
export {
  localConfig as config,
  embedExport as embed,
  enableMaintenanceExport as enableMaintenance,
  disableMaintenanceExport as disableMaintenance
}
