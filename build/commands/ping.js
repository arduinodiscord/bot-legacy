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
var Command = require('discord-akairo').Command;
var config = require('../bot').config;
var PingCommand = /** @class */ (function (_super) {
    __extends(PingCommand, _super);
    function PingCommand() {
        return _super.call(this, 'ping', {
            aliases: ['ping', 'ms'],
            channel: 'guild',
            description: 'Get the latency of the bot.'
        }) || this;
    }
    PingCommand.prototype.exec = function (message) {
        var _this = this;
        var pingInit = {
            title: 'Pinging...',
            color: '#00b3b3',
            timestamp: new Date(),
            footer: {
                text: config.footer
            }
        };
        var pingEmbed = this.client.util.embed(pingInit);
        message.channel.send(pingEmbed).then(function (m) {
            var newPingEmbed = _this.client.util.embed(__assign(__assign({}, pingInit), { title: "Pong! Round-trip latency is " + (m.createdTimestamp - message.createdTimestamp) + "ms. API latency is " + Math.round(_this.client.ws.ping) + "ms." }));
            m.edit(newPingEmbed);
        });
    };
    return PingCommand;
}(Command));
module.exports = PingCommand;
