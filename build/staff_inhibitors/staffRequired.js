import { Inhibitor } from 'discord-akairo';
import { config } from '../bot';
export default class StaffRequiredInhibitor extends Inhibitor {
    constructor() {
        super('staffRequired', {
            reason: 'staffRoleRequired',
            type: 'post'
        });
    }
    exec(message, command) {
        if (!message.guild)
            throw "Message Guild not found";
        let member = message.guild.members.cache.find(member => member.id === message.author.id);
        var roleAbsent = (roleId) => {
            if (!member)
                throw "Can't find member";
            return !!member.roles.cache.find(role => role.id === roleId);
        };
        if (command.id === "gist") {
            return roleAbsent(config.roles.helper);
        }
        else {
            return roleAbsent(config.roles.staff);
        }
    }
}
//# sourceMappingURL=staffRequired.js.map