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
var embed = require('../bot').embed;
var version = require('../../package.json').version;
var Duration = require('luxon').Duration;
var packLock;
try {
    packLock = require('../package-lock.json');
}
catch (err) {
    packLock = undefined;
}
var AboutCommand = /** @class */ (function (_super) {
    __extends(AboutCommand, _super);
    function AboutCommand() {
        return _super.call(this, 'about', {
            aliases: ['about'],
            description: 'Get information about this bot.'
        }) || this;
    }
    AboutCommand.prototype.exec = function (message) {
        var about = new MessageEmbed(embed)
            .setTimestamp(new Date())
            .setTitle('About Arduino Bot')
            .addField('Bot Version', version, true)
            .addField('Node Version', process.version, true);
        if (packLock) {
            about.addField('DiscordJS Version', 'v' + packLock.dependencies['discord.js'].version, true);
            about.addField('Akairo Version', 'v' + packLock.dependencies['discord-akairo'].version, true);
        }
        about.addField('Contributing', '[GitHub](https://github.com/BluLightShow/arduino-bot)', true);
        var clientDuration = Duration.fromMillis(this.client.uptime).toFormat('d h m').split(' ');
        about.addField('Uptime', clientDuration[0] + " days, " + clientDuration[1] + " hours, " + clientDuration[2] + " minutes");
        message.channel.send(about);
    };
    return AboutCommand;
}(Command));
module.exports = AboutCommand;
