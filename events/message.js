var bot = require('../bot.js');

module.exports = (client, message) => {
    var embed = new bot.Discord.RichEmbed();

    if (message.author.bot) return;

    if (message.channel.type === "dm") {
        embed.setTitle(`**Mod Mail is coming soon!**`);
        embed.setDescription(`In the meantime, you can look for a moderator in <&420594746990526468>!`);
        embed.setColor("#00b3b3");
        embed.setFooter(bot.footer);
        embed.setTimestamp(new Date());
        message.channel.send(embed);
        return;
    };

    if (message.content.indexOf("!") !== 0) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const sender = message.author;
    const channel = message.channel;
    const footer = bot.footer;

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
    // If that command doesn't exist, exit and do nothing
    if (!cmd) return;
    // Run the command
    cmd.run(client, message, args, embed, sender, channel, thumbnail, footer, reactions);
};