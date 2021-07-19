import { config as envConfig } from 'dotenv';
envConfig();
import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import * as Discord from 'discord.js';
import { version } from '../package.json';
let config;
console.log('Attempting to use development config...');
await import('../config-dev.json')
    .then((configDev) => {
    config = configDev;
})
    .catch((err) => {
    console.log('Failed to find development config...trying production...');
    import('../config-prod.json')
        .then((configProd) => {
        config = configProd;
    })
        .catch((err) => {
        console.error('Failed to load a production config...missing config file?');
        process.exit(1);
    });
});
const embed = new Discord.MessageEmbed()
    .setFooter(config.embeds.footer)
    .setColor(config.embeds.color);
export { config, embed, enableMaintenance, disableMaintenance };
class MainClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.owners
        }, {
            fetchAllMembers: true,
            presence: {
                status: 'online',
                activity: {
                    name: `${config.prefix}help | ${version}`,
                    type: 'WATCHING'
                }
            }
        });
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: config.prefix,
            defaultCooldown: 5000,
            commandUtil: true
        });
        this.staffComandHandler = new CommandHandler(this, {
            directory: './staff_commands/',
            prefix: config.staffPrefix,
            defaultCooldown: 1000,
            commandUtil: true
        });
        this.staffInhibitorHandler = new InhibitorHandler(this, {
            directory: './staff_inhibitors/'
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });
        // Main Handlers
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        // Staff Handlers
        this.staffComandHandler.useInhibitorHandler(this.staffInhibitorHandler);
        this.staffComandHandler.loadAll();
        this.staffInhibitorHandler.loadAll();
    }
}
const client = new MainClient();
function enableMaintenance() {
    if (!client.user)
        throw 'Client User not initilized';
    client.commandHandler.removeAll();
    client.listenerHandler.removeAll();
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: `Offline - Back soon!`,
            type: 'WATCHING'
        }
    });
}
function disableMaintenance() {
    if (!client.user)
        throw 'Client User not initilized';
    client.commandHandler.loadAll();
    client.listenerHandler.loadAll();
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `${config.prefix}help | ${version}`,
            type: 'WATCHING'
        }
    });
}
if (config.token) {
    console.log('Logging in via config token...');
    client.login(config.token);
}
else {
    console.log('Logging in via environment token...');
    client.login(process.env.BOT_TOKEN);
}
//# sourceMappingURL=bot.js.map