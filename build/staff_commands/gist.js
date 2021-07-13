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
var Gists = require('gists');
var _a = require('../bot'), embed = _a.embed, config = _a.config;
var MessageEmbed = require('discord.js').MessageEmbed;
var gists = new Gists({
    token: process.env.GITHUB_TOKEN
});
var GistCommand = /** @class */ (function (_super) {
    __extends(GistCommand, _super);
    function GistCommand() {
        return _super.call(this, 'gist', {
            aliases: ['gist', 'paste'],
            channel: 'guild',
            description: 'Command for helpers to paste any message to a gist.',
            args: [
                {
                    id: 'message',
                    type: 'message'
                }
            ],
        }) || this;
    }
    GistCommand.prototype.exec = function (message, args) {
        if (args.message) {
            var code = args.message;
            gists.create({
                "description": "Code by " + code.author.tag + " - " + new Date(),
                "public": true,
                "files": {
                    "ArduinoDiscordBot.md": {
                        "content": "## This gist was pasted by the Arduino discord server bot.\n          \n[![](https://img.shields.io/github/issues/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/issues) [![](https://img.shields.io/github/forks/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/stars/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/license/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/blob/master/LICENSE) [![](https://user-images.githubusercontent.com/7288322/34429152-141689f8-ecb9-11e7-8003-b5a10a5fcb29.png)](http://arduino.cc/discord)\n          \n> **This gist was automatically pasted at the request of one of the discord server helpers. If you have any suggestions or bugs to report, you can do so on our [GitHub](https://github.com/BluLightShow/arduino-bot/ \"GitHub page\") repository, or in our discord server. This project is run by volunteers so feel free to fork and commit your changes then open a pull request!**\n          \n------------\n          \n# \u2B07\uFE0F Pasted Code \u2B07\uFE0F"
                    },
                    "MessagePaste.cpp": {
                        "content": code.content
                    }
                }
            }).then(function (gist) {
                message.channel.send(new MessageEmbed(embed)
                    .setTimestamp(new Date())
                    .setTitle('Requested message was successfully pasted to gist!')
                    .setDescription("**" + gist.body.html_url + "**")
                    .setAuthor("Code by " + code.author.tag, code.author.avatarURL({ dynamic: true }))
                    .addField('Paste requested by:', message.author.tag, true)).then(function () {
                    code.delete().catch(function (err) { return console.error(err); });
                });
            });
        }
    };
    return GistCommand;
}(Command));
module.exports = GistCommand;
