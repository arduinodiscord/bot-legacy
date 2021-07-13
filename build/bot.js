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
require('dotenv').config();
var _a = require('discord-akairo'), AkairoClient = _a.AkairoClient, CommandHandler = _a.CommandHandler, InhibitorHandler = _a.InhibitorHandler, ListenerHandler = _a.ListenerHandler;
var Discord = require('discord.js');
var version = require('./package.json').version;
var config;
try {
    console.log('Attempting to use development config...');
    config = require('./config-dev.json');
}
catch (err) {
    console.log('Failed to find development config...trying production...');
}
if (!config) {
    try {
        config = require('./config-prod.json');
    }
    catch (err) {
        console.error('Failed to load a production config...missing config file?');
        process.exit(1);
    }
}
else {
    console.log('Starting up with development config...');
}
var embed = new Discord.MessageEmbed()
    .setFooter(config.embeds.footer)
    .setColor(config.embeds.color);
module.exports = {
    config: config,
    embed: embed,
    enableMaintenance: enableMaintenance,
    disableMaintenance: disableMaintenance
};
var MainClient = /** @class */ (function (_super) {
    __extends(MainClient, _super);
    function MainClient() {
        var _this = _super.call(this, {
            ownerID: config.owners
        }, {
            fetchAllMembers: true,
            presence: {
                status: 'online',
                activity: {
                    name: config.prefix + "help | " + version,
                    type: 'WATCHING'
                }
            }
        }) || this;
        _this.commandHandler = new CommandHandler(_this, {
            directory: './commands/',
            prefix: config.prefix,
            defaultCooldown: 5000,
            commandUtil: true
        });
        _this.staffComandHandler = new CommandHandler(_this, {
            directory: './staff_commands/',
            prefix: config.staffPrefix,
            defaultCooldown: 1000,
            commandUtil: true
        });
        _this.staffInhibitorHandler = new InhibitorHandler(_this, {
            directory: './staff_inhibitors/'
        });
        _this.listenerHandler = new ListenerHandler(_this, {
            directory: './listeners/'
        });
        // Main Handlers
        _this.commandHandler.useListenerHandler(_this.listenerHandler);
        _this.listenerHandler.loadAll();
        _this.commandHandler.loadAll();
        // Staff Handlers
        _this.staffComandHandler.useInhibitorHandler(_this.staffInhibitorHandler);
        _this.staffComandHandler.loadAll();
        _this.staffInhibitorHandler.loadAll();
        return _this;
    }
    return MainClient;
}(AkairoClient));
var client = new MainClient();
function enableMaintenance() {
    client.commandHandler.removeAll();
    client.listenerHandler.removeAll();
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: "Offline - Back soon!",
            type: 'WATCHING'
        }
    });
}
function disableMaintenance() {
    client.commandHandler.loadAll();
    client.listenerHandler.loadAll();
    client.user.setPresence({
        status: 'online',
        activity: {
            name: config.prefix + "help | " + version,
            type: 'WATCHING'
        }
    });
}
if (config.token) {
    console.log("Logging in via config token...");
    client.login(config.token);
}
else {
    console.log("Logging in via environment token...");
    client.login(process.env.BOT_TOKEN);
}
