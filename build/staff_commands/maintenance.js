import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { embed, enableMaintenance, disableMaintenance } from '../bot';
var maintenanceEnabled = false;
export class MaintenanceCommand extends Command {
    constructor() {
        super('maintenance', {
            aliases: ['maintenance'],
            description: '(For admins) Toggle bot maintenance mode.',
            channel: 'guild',
            userPermissions: 'ADMINISTRATOR',
        });
    }
    exec(message, args) {
        if (maintenanceEnabled) {
            disableMaintenance();
            maintenanceEnabled = false;
            message.channel.send(new MessageEmbed(embed)
                .setTitle('Maintenance is now disabled.')
                .setTimestamp(new Date()));
        }
        else {
            enableMaintenance();
            maintenanceEnabled = true;
            message.channel.send(new MessageEmbed(embed)
                .setTitle('Maintenance is now enabled.')
                .setTimestamp(new Date()));
        }
    }
}
//# sourceMappingURL=maintenance.js.map