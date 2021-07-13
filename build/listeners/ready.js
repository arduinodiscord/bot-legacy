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
var config = require('../bot').config;
var cache = require('../utils/cache');
var ReadyListener = /** @class */ (function (_super) {
    __extends(ReadyListener, _super);
    function ReadyListener() {
        return _super.call(this, 'ready', {
            emitter: 'client',
            event: 'ready'
        }) || this;
    }
    ReadyListener.prototype.exec = function () {
        console.log("Logged into account: " + this.client.user.tag);
        var guild = this.client.guilds.resolve(config.guild);
        guild.fetchInvites().then(function (invites) {
            invites.each(function (invite) {
                cache.setInviteCache(invite.code, invite.uses);
            });
        }).then(function () {
            console.log("Invite cache has been filled.");
        });
        console.log("Arduino Bot " + version + " ready for battle!");
    };
    return ReadyListener;
}(Listener));
module.exports = ReadyListener;
