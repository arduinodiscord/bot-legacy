const Discord = require('discord.js');
const client = new Discord.Client();
const version = "0.0.1" // DO NOT MODIFY
const auth = require('./authentication.json');

module.exports = {
    Discord: Discord,
    client: client,
    version: version,
}

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