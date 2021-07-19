import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { embed } from '../bot';
import { version } from '../../package.json';
import { Duration } from 'luxon';
import packLock from './../../package-lock.json';
export class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about'],
            description: 'Get information about this bot.'
        });
    }
    exec(message) {
        const about = new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle('About Arduino Bot')
            .addField('Bot Version', version, true)
            .addField('Node Version', process.version, true);
        if (packLock) {
            about.addField('DiscordJS Version', 'v' + packLock.dependencies['discord.js'].version, true);
            about.addField('Akairo Version', 'v' + packLock.dependencies['discord-akairo'].version, true);
        }
        about.addField('Contributing', '[GitHub](https://github.com/BluLightShow/arduino-bot)', true);
        if (!this.client.uptime)
            throw "Uptime invalid";
        var clientDuration = Duration.fromMillis(this.client.uptime).toFormat('d h m').split(' ');
        about.addField('Uptime', `${clientDuration[0]} days, ${clientDuration[1]} hours, ${clientDuration[2]} minutes`);
        message.channel.send(about);
    }
}
//# sourceMappingURL=about.js.map