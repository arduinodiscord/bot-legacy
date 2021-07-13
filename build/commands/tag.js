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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var Command = require('discord-akairo').Command;
var fs = require('fs');
var MessageEmbed = require('discord.js').MessageEmbed;
var _a = require('../bot'), embed = _a.embed, config = _a.config;
var files = fs.readdirSync('./src/tags');
var aggregateAliases = [];
files.forEach(function (file) {
    if (file.endsWith('.json') && (file !== 'template.json')) {
        var tagFile = JSON.parse(fs.readFileSync("./tags/" + file));
        aggregateAliases = __spreadArray(__spreadArray([], aggregateAliases), tagFile.directAliases);
    }
});
var TagCommand = /** @class */ (function (_super) {
    __extends(TagCommand, _super);
    function TagCommand() {
        return _super.call(this, 'tag', {
            aliases: __spreadArray(__spreadArray([], aggregateAliases), ['tag', 'qr', 'res']),
            channel: 'guild',
            description: 'Send a canned response in the channel.',
            args: [
                {
                    id: 'tagAlias',
                    type: 'string'
                }
            ]
        }) || this;
    }
    TagCommand.prototype.exec = function (message, args) {
        // var usedAlias = message.util.parsed.alias -- This should work but it's not so I'm writing a workaround
        var usedAlias = message.content.replace(config.prefix, '').split(' ')[0];
        if (usedAlias === ('tag' || 'qr' || 'res')) {
            if (!args.tagAlias) {
                var tagEmbed = new MessageEmbed(embed)
                    .setTitle("List of available tags");
                files.forEach(function (file) {
                    if (file.endsWith('.json') && (file !== 'template.json')) {
                        var tagFile = JSON.parse(fs.readFileSync("./tags/" + file));
                        tagEmbed.addField(tagFile.directAliases[0], tagFile.title);
                    }
                });
                message.channel.send(tagEmbed);
            }
            else {
                files.forEach(function (file) {
                    if (file.endsWith('.json') && (file !== 'template.json')) {
                        var tagFile = JSON.parse(fs.readFileSync("./tags/" + file));
                        if (tagFile.aliases.includes(args.tagAlias)) {
                            var tagEmbed = new MessageEmbed(embed)
                                .setTitle(tagFile.title);
                            if (tagFile.image)
                                tagEmbed.setImage(tagFile.image);
                            tagFile.fields.forEach(function (field) {
                                tagEmbed.addField(field.name, field.value, false);
                            });
                            return message.channel.send(tagEmbed);
                        }
                    }
                });
            }
        }
        else {
            files.forEach(function (file) {
                if (file.endsWith('.json') && (file !== 'template.json')) {
                    var tagFile = JSON.parse(fs.readFileSync("./tags/" + file));
                    if (tagFile.directAliases.includes(usedAlias)) {
                        var tagEmbed = new MessageEmbed(embed)
                            .setTitle(tagFile.title);
                        if (tagFile.image)
                            tagEmbed.setImage(tagFile.image);
                        tagFile.fields.forEach(function (field) {
                            tagEmbed.addField(field.name, field.value, false);
                        });
                        return message.channel.send(tagEmbed);
                    }
                }
            });
        }
    };
    return TagCommand;
}(Command));
module.exports = TagCommand;
