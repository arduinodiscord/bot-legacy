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
var version = require('../package.json').version;
var cache = require('../utils/cache');
var MessageEmbed = require('discord.js').MessageEmbed;
var _a = require('../bot'), embed = _a.embed, config = _a.config;
var DateTime = require('luxon').DateTime;
var GuildMemberAddListener = /** @class */ (function (_super) {
    __extends(GuildMemberAddListener, _super);
    function GuildMemberAddListener() {
        return _super.call(this, 'guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        }) || this;
    }
    GuildMemberAddListener.prototype.exec = function (member) {
        var logChannel = member.guild.channels.resolve(config.channels.joinLeaveLog);
        member.guild.fetchInvites().then(function (invites) {
            var inviteSource = undefined;
            invites.each(function (invite) {
                if (invite.uses !== cache.getInviteCache(invite.code))
                    inviteSource = invite;
            });
            var inviteEmbed = new MessageEmbed(embed)
                .setTitle("Member joined")
                .setTimestamp(new Date())
                .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
                .setDescription("#" + member.guild.memberCount + " to join")
                .setFooter("ID: " + member.id);
            if (inviteSource) {
                cache.setInviteCache(inviteSource.code, inviteSource.uses);
                logChannel.send(inviteEmbed.addField("Joined with invite code " + inviteSource.code + " created by " + inviteSource.inviter.tag, "Account created " + DateTime.fromJSDate(member.user.createdAt).toLocaleString()));
            }
            else {
                logChannel.send(inviteEmbed.addField("Joined with unknown invite code. Likely through Server Discovery.", "Account created " + DateTime.fromJSDate(member.user.createdAt).toLocaleString()));
            }
        });
    };
    return GuildMemberAddListener;
}(Listener));
module.exports = GuildMemberAddListener;
