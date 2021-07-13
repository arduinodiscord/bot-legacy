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
var fs = require('fs');
var MessageEmbed = require('discord.js').MessageEmbed;
var _a = require('../bot'), embed = _a.embed, config = _a.config;
var HelpCommand = /** @class */ (function (_super) {
    __extends(HelpCommand, _super);
    function HelpCommand() {
        return _super.call(this, 'help', {
            aliases: ['help', '?'],
            channel: 'guild',
            description: 'Displays the help page.'
        }) || this;
    }
    HelpCommand.prototype.exec = function (message) {
        var helpEmbed = new MessageEmbed(embed)
            .setTitle('Arduino Bot Help')
            .setTimestamp(new Date());
        this.handler.modules.each(function (module) {
            helpEmbed.addField("" + config.prefix + module.id, module.description, true);
        });
        message.channel.send(helpEmbed);
    };
    return HelpCommand;
}(Command));
module.exports = HelpCommand;
