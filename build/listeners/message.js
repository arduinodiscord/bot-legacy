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
var Listener = require('discord-akairo').Listener;
var MessageEmbed = require('discord.js').MessageEmbed;
var stringSimilarity = require('string-similarity');
var _a = require('../bot'), embed = _a.embed, config = _a.config;
var MessageListener = /** @class */ (function (_super) {
    __extends(MessageListener, _super);
    function MessageListener() {
        return _super.call(this, 'message', {
            emitter: 'client',
            event: 'message'
        }) || this;
    }
    MessageListener.prototype.exec = function (message) {
        if (message.author.bot)
            return;
        // Duplicates filter
        for (var i = 0; i < config.channels.preventDuplicates.length; i++) {
            var channelID = config.channels.preventDuplicates[i];
            if (message.channel.id === channelID)
                continue;
            var channel = message.guild.channels.resolve(channelID);
            var original = channel.messages.cache.find(function (msg) {
                // Conditions to flag message as duplicate
                return (stringSimilarity.compareTwoStrings(msg.content, message.content) >= 0.9) && (msg.content.length >= 10) && (message.author === msg.author);
            });
            if (original) {
                message.delete();
                // DM offender
                var dmMessage = new MessageEmbed(embed)
                    .setTitle("We've detected that you sent a duplicate message in multiple channels.")
                    .setDescription("This is against our rules, please refrain from crossposting duplicate messages in the future. If you believe this message was sent in error, please DM <@799678733723893821> with valid reasoning.")
                    .setTimestamp(new Date());
                if (message.author.dmChannel) {
                    message.author.dmChannel.send(dmMessage);
                }
                else {
                    message.author.createDM().then(function (dmChannel) {
                        dmChannel.send(dmMessage);
                    });
                }
                // Post to mod log
                message.guild.channels.resolve(config.channels.moderationLog).send(new MessageEmbed(embed)
                    .setTitle("Duplicate Crosspost Detected")
                    .addField("Offender", message.author.tag, true)
                    .addField("Channel", message.channel.toString())
                    .addField("Similarity", Math.floor(stringSimilarity.compareTwoStrings(original.content, message.content) * 10000) / 100 + "%", true)
                    .setTimestamp(new Date()));
                break;
            }
        }
        // File filter
        if (message.attachments.find(function (attachment) {
            var blockedExtensions = ['exe', 'dll', 'lnk', 'swf', 'sys', 'scr', 'bat', 'ws', 'bin', 'com', 'ocx', 'drv', 'class', 'xnxx', 'dev', 'pif', 'sop', 'exe1', 'lik', 'cih', 'dyz', 'osa', 'scr', 'bup', 'vexe', 'oar'];
            var extension = attachment.name.split('.').pop().toLowerCase();
            return (blockedExtensions.includes(extension)) && (!message.member.roles.cache.find(function (role) { return role.id === '451152561735467018'; }));
        })) {
            message.delete().then(function () {
                message.channel.send(new MessageEmbed(embed)
                    .setTimestamp(new Date())
                    .setTitle("That filetype is not allowed.")
                    .setDescription('Please DM <@799678733723893821> for more information.')
                    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })));
            }).catch(function (err) {
                console.log("Error occurred after deleting banned file attachment type.");
                console.error(err);
            });
        }
        // Initial reaction for code block pastes
        if (message.content.includes('```') && message.content.match(/```/g).length >= 2) {
            message.react(config.pasteEmoji).catch(function (err) { return console.error(err); });
        }
        // Message link flattening
        var messageLinkMatchArray = message.content.match(/https?:\/\/(canary.)?discord\.com\/channels\/\d{18}\/\d{18}\/\d{18}/gm);
        if (messageLinkMatchArray) {
            messageLinkMatchArray.forEach(function (link) {
                var linkArray = link.split('/');
                linkArray.splice(0, 4);
                if (linkArray[0] === message.guild.id) {
                    message.guild.channels.resolve(linkArray[1]).messages.fetch(linkArray[2]).then(function (msg) {
                        message.channel.send(new MessageEmbed(embed)
                            .setTitle(msg.content)
                            .setAuthor(msg.author.tag + ' said:', msg.author.avatarURL({ dynamic: true }))
                            .setFooter("Message link sent by " + message.author.tag + ", click original for context."));
                    }).catch(function (err) {
                        console.error(err);
                    });
                }
            });
        }
        // Auto-crosspost feed channels
        if (config.channels.toCrosspost.includes("" + message.channel.id)) {
            var crosspostLog = message.guild.channels.resolve(config.channels.crosspostLog);
            if (message.crosspostable) {
                message.crosspost().then(function () {
                    crosspostLog.send(new MessageEmbed(embed)
                        .setTimestamp(new Date())
                        .setTitle("Successfully auto-crossposted in #" + message.channel.name));
                }).catch(function (err) {
                    console.error(err);
                    crosspostLog.send(new MessageEmbed(embed)
                        .setTimestamp(new Date())
                        .setTitle("Failed to auto-crosspost in #" + message.channel.name)
                        .setDescription('This is likely due to ratelimiting. Check production logs for more information.'));
                });
            }
        }
    };
    return MessageListener;
}(Listener));
module.exports = MessageListener;
