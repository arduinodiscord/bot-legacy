var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Command = require('discord-akairo').Command;
var MessageEmbed = require('discord.js').MessageEmbed;
var _a = require('../bot'), embed = _a.embed, enableMaintenance = _a.enableMaintenance, disableMaintenance = _a.disableMaintenance;
var maintenanceEnabled = false;
var MaintenanceCommand = /** @class */ (function (_super) {
    __extends(MaintenanceCommand, _super);
    function MaintenanceCommand() {
        return _super.call(this, 'maintenance', {
            aliases: ['maintenance'],
            description: '(For admins) Toggle bot maintenance mode.',
            channel: 'guild',
            userPermissions: 'ADMINISTRATOR',
        }) || this;
    }
    MaintenanceCommand.prototype.exec = function (message, args) {
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
    };
    return MaintenanceCommand;
}(Command));
module.exports = MaintenanceCommand;
