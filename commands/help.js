exports.run = (client, message, args, embed, sender, channel, footer) => {
    
    /*embed.setTitle(`Help!`);
    embed.setDescription(`**Usage: [optional], (requires), this | or this, "literal text`);
    embed.setColor("#00b3b3");
    embed.setTimestamp(new Date());*/

    embed.setTitle(`**Coming Soon!**`);
    embed.setDescription("*This bot is still in development! This help page will be filled in soon!*");
    embed.setColor("#00b3b3");
    embed.setTimestamp(new Date());
    channel.send(embed);
};