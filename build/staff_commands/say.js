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
var SayCommand = /** @class */ (function (_super) {
    __extends(SayCommand, _super);
    function SayCommand() {
        return _super.call(this, 'say', {
            aliases: ['say'],
            description: '(For admins) Have the bot say something as an embed.',
            channel: 'guild',
            userPermissions: 'ADMINISTRATOR',
            argumentDefaults: {
                prompt: {
                    time: 1200000
                }
            },
            args: [
                {
                    id: 'channel',
                    type: 'channel',
                    prompt: {
                        start: function (m) {
                            return new MessageEmbed(embed)
                                .setTitle('What channel would you like the message sent in?')
                                .setTimestamp(new Date());
                        }
                    }
                },
                {
                    id: 'title',
                    type: 'string',
                    prompt: {
                        start: function (m) {
                            return new MessageEmbed(embed)
                                .setTitle('What would you like the primary embed title to be?');
                        }
                    }
                },
                {
                    id: 'description',
                    type: 'string',
                    prompt: {
                        start: function (m) {
                            return new MessageEmbed(embed)
                                .setTitle('What would you like the primary embed description to be?');
                        }
                    }
                },
                {
                    id: 'fields',
                    type: 'string',
                    prompt: {
                        infinite: true,
                        stopWord: 'done',
                        start: function (m) {
                            return new MessageEmbed(embed)
                                .setTitle('What fields would you like to send? **Read below!!**')
                                .setDescription('Please send **separate** messages alternating between the new field title and the new field value. Add as many fields as you want, and when you are ready to go to the next step, send the message "`done`". You have 20 minutes to complete this step.')
                                .setTimestamp(new Date());
                        }
                    }
                }
            ]
        }) || this;
    }
    SayCommand.prototype.exec = function (message, args) {
        if ((args.fields.length % 2) !== 0) {
            return message.channel.send(new MessageEmbed(embed)
                .setTitle('No value was supplied for your final field. Every field must have a name and a value. Canceling command.')
                .setTimestamp(new Date()));
        }
        message.channel.send(new MessageEmbed(embed)
            .setTitle('If you would like to add a thumbnail (small in top right), react with ✅. Otherwise react with ❌')
            .setTimestamp(new Date())).then(function (m) {
            m.react('✅').then(function () {
                m.react('❌').then(function () {
                    m.awaitReactions(function (reaction, user) { return user === message.author; }, { max: 1, time: 300000 }).then(function (reactionCollection) {
                        var reaction = reactionCollection.first();
                        if (reaction.emoji.toString() === '✅') {
                            message.channel.send(new MessageEmbed(embed)
                                .setTitle('What thumbnail would you like to add? Please provide a direct URL.')
                                .setTimestamp(new Date())).then(function () {
                                message.channel.awaitMessages(function (msg) { return msg.author === message.author; }, { max: 1, time: 300000 }).then(function (msgCollector) {
                                    var msg = msgCollector.first();
                                    try {
                                        var url = new URL(msg.content);
                                    }
                                    catch (err) {
                                        return message.channel.send(new MessageEmbed(embed)
                                            .setTitle('URL provided was invalid. Canceling command.')
                                            .setTimestamp(new Date()));
                                    }
                                    args.thumbnail = url.toString();
                                    sendIt(true);
                                });
                            });
                        }
                        else if (reaction.emoji.toString() === '❌') {
                            sendIt(false);
                        }
                    });
                });
            });
        });
        function sendIt(thumbnail) {
            var say = new MessageEmbed(embed)
                .setTimestamp(new Date())
                .setTitle(args.title).setDescription(args.description);
            // And that's on spending an hour realizing you can't iterate over an array you're modifying
            var iterableLength = args.fields.length;
            for (var i = 0; i < iterableLength / 2; i++) {
                var name_1 = args.fields.shift();
                var value = args.fields.shift();
                say.addField(name_1, value);
            }
            if (thumbnail) {
                say.setThumbnail(args.thumbnail);
            }
            message.guild.channels.resolve(args.channel).send(say).then(function () {
                message.channel.send(new MessageEmbed(embed)
                    .setTimestamp(new Date())
                    .setTitle('Great success!')
                    .setDescription('Embed sent.'));
            }).catch(function (err) {
                message.channel.send(new MessageEmbed(embed)
                    .setTimestamp(new Date())
                    .setTitle('An error occured whilst trying to send.')
                    .setDescription('Error: ' + err));
            });
        }
    };
    return SayCommand;
}(Command));
module.exports = SayCommand;
