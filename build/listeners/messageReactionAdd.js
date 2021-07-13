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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Listener = require('discord-akairo').Listener;
var MessageEmbed = require('discord.js').MessageEmbed;
var Gists = require('gists');
var _a = require('../bot'), embed = _a.embed, config = _a.config;
var gists = new Gists({
    token: process.env.GITHUB_TOKEN
});
var MessageReactionAddListener = /** @class */ (function (_super) {
    __extends(MessageReactionAddListener, _super);
    function MessageReactionAddListener() {
        return _super.call(this, 'messageReactionAdd', {
            emitter: 'client',
            event: 'messageReactionAdd'
        }) || this;
    }
    MessageReactionAddListener.prototype.exec = function (reaction, user) {
        var _a;
        if (user.bot)
            return;
        if (reaction.emoji.id === config.pasteEmoji && reaction.me) {
            if (user.id === reaction.message.author.id || reaction.message.guild.members.resolve(user.id).roles.cache.find(function (role) { return role.id === config.roles.helper; })) {
                var message_1 = reaction.message;
                var content = message_1.content;
                var numberOfSeparators = message_1.content.match(/```/g).length;
                var array = content.slice(content.indexOf('```'), content.length).split('```');
                var currentCodeBlock = 0;
                var files_1 = {
                    "ArduinoDiscordBot.md": {
                        "content": "## This gist was pasted by the Arduino discord server bot.\n            \n[![](https://img.shields.io/github/issues/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/issues) [![](https://img.shields.io/github/forks/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/stars/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/license/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/blob/master/LICENSE) [![](https://img.shields.io/discord/420594746990526466?color=%237289DA&label=%20Discord%20&logo=discord&logoColor=%23FFFFFF)](https://arduino.cc/discord)\n            \n> **This gist was automatically pasted at the request of the code author or one of the discord server helpers. If you have any suggestions or bugs to report, you can do so on our [GitHub](https://github.com/BluLightShow/arduino-bot/ \"GitHub page\") repository, or in our discord server. This project is run by volunteers so feel free to fork and commit your changes then open a pull request!**\n            \n------------\n            \n# \u2B07\uFE0F Pasted Code \u2B07\uFE0F"
                    }
                };
                for (var i = 0; i <= numberOfSeparators; i++) {
                    if (i % 2 !== 0) {
                        currentCodeBlock++;
                        files_1 = __assign(__assign({}, files_1), (_a = {}, _a["CodeBlock-" + currentCodeBlock + ".cpp"] = {
                            "content": array[i]
                        }, _a));
                    }
                }
                gists.create({
                    "description": "Code by " + message_1.author.tag + " - " + new Date(),
                    "public": true,
                    "files": __assign({}, files_1)
                }).then(function (gist) {
                    message_1.channel.send(new MessageEmbed(embed)
                        .setTimestamp(new Date())
                        .setTitle('Requested code block was successfully pasted to gist!')
                        .setDescription("**" + gist.body.html_url + "**")
                        .setAuthor("Code by " + message_1.author.tag, message_1.author.avatarURL({ dynamic: true }))
                        .addField('Paste requested by:', user.tag, true)).then(function () {
                        message_1.delete().catch(function (err) {
                            console.error(err);
                            console.log("Error occurred deleting original after reaction paste.");
                        });
                    });
                });
            }
            else {
                reaction.users.remove(user);
            }
        }
    };
    return MessageReactionAddListener;
}(Listener));
module.exports = MessageReactionAddListener;
