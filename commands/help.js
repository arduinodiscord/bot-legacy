exports.run = (client, message, args, embed, sender, channel, footer) => {
    
    embed.setTitle(`Help!`);
    embed.setDescription(`**Usage: [optional], (requires), this | or this, "literal text**`);
    embed.setColor("#00b3b3");
    embed.setTimestamp(new Date());
    // START CONTENT
    embed.addField()

    channel.send(embed);
};