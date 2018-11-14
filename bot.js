const Discord = require('discord.js');
const client = new Discord.Client();
const version = "0.0.1" // DO NOT MODIFY
const auth = require('./authentication.json');
const fs = require('fs');
const enmap = require('enmap');

var footer = "Have a bug to report or a feature to request? Contact a mod!";

module.exports = {
    Discord: Discord,
    client: client,
    version: version,
    footer, footer
}

fs.readdir("./events/", (err, files) => {
    if (err) return console.err(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        let embed = new Discord.RichEmbed();
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props)
    });
});

client.on('ready', () => {
    console.log("[Start]")
    client.user.setPresence({
        game: {
            name: 'Arduino | !help',
            type: 'WATCHING'
        },

        status: 'online',
    });
});

client.login(auth.token);