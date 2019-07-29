const Discord = require('discord.js');
var PastebinAPI = require('pastebin-js');
const config = require('./config.json');
const client = new Discord.Client();
var fs = require('fs');

var pastebin = new PastebinAPI(config.pastebinToken);


const SPc = new Discord.RichEmbed() //series and parallel for circuits (not batteries)
	.setColor('#00979C')
	.setTitle('Parallel and Series')
	.setAuthor('Arduino', 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1', 'https://www.arduino.cc/')
	.setDescription('Components of an eletrical circuit can be connected in two different ways:')
	.setThumbnail('https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1')
	.addField('Parallel', 'A parallel circuit consists of electrically connected components arranged side to side. These components share the same voltage but may differ in current.', true)
	.addField('Series', 'A series circuit consists of electrically connected components arranged as a chain. These components share the same current but may differ in voltage.', true)
	.setImage('https://i.ibb.co/jgXw4H0/parallel-series.png')
	.setTimestamp()
	.setFooter('Arduino bot docs', 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1');

const SPb = new Discord.RichEmbed() //series and parallel for circuits (not batteries)
	.setColor('#00979C')
	.setTitle('Parallel and Series batteries')
	.setAuthor('Arduino', 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1', 'https://www.arduino.cc/')
	.setDescription('Multiple batteries can be connected together in two different ways and a combination of those:')
	.setThumbnail('https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1')
	.addField('Parallel', 'In parallel the batteries act like they were only one, by giving the same voltage, but they have increased capacity and peak current. Be aware while building one of this kind of battery pack that voltage between each cell need to be the same, otherwise you risk of destroying your cells.', true)
	.addField('Series', 'In series the battery sum their voltage, while keeping the capacity the same as the original single cell. If you are building this kind of battery pack,if rechargeable you must include a BMS(Battery Management System) to balance charging, otherwise you migth destroy your cell(s) (especialy if lithium based).', true)
	.setImage('https://i.ibb.co/6NgKW3D/parallel-series-battery.png')
	.setTimestamp()
	.setFooter('Arduino bot docs', 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1');


const resistors = new Discord.RichEmbed() //series and parallel for circuits (not batteries)
	.setColor('#00979C')
	.setTitle('Resistors')
	.setAuthor('Arduino', 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1', 'https://www.arduino.cc/')
	.setDescription('A resistor is a passive two-terminal electrical component that implements electrical resistance as a circuit element. In electronic circuits, resistors are used to reduce current flow, adjust signal levels, to divide voltages, bias active elements, and terminate transmission lines, among other uses.')
	.setThumbnail('https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.sparkfun.com%2Fassets%2Fc%2F4%2Fa%2F9%2Fd%2F515c7a2bce395f653d000002.png&f=1')
	.addField('How to read the value of SMD resistors', 'To calculate the value of SMD resistor we suggest to use this site: https://www.hobby-hour.com/electronics/smdcalc.php', true)
	.addField('How to read the value of THT resistors', 'The value of THT resistors can be read by the following table', true)
	.setImage('https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fsupport.infocenter.gr%2Fwp-content%2Fuploads%2F2012%2F07%2FResistorColorCode.jpg&f=1')
	.setTimestamp()
	.setFooter('Arduino bot docs', 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*eYLvFjmi77iM_cjJTvRymg.png&f=1');


function deleteMessage(message) {

	message.channel.fetchMessage(message.id)
		.then(message.delete())
		.catch(console.error);

}

client.on('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.startsWith(config.prefix + 'ping')) {
		s

		message.channel.send(':ping_pong: Pong!');

	} else if (message.content.startsWith(config.prefix + 'ban')) {


		if (!message.member.roles.some(r => ["admin"].includes(r.name)))
			return message.reply("Sorry, you don't have permissions to use this!");

		let member = message.mentions.members.first();
		if (!member)
			return message.reply("Please mention a valid member of this server");
		if (!member.bannable)
			return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

		member.ban("Don't ask")

			.catch(error => message.reply(`Sorry **${message.author}** I couldn't ban because of : **${error}**`));

		message.channel.send(`**${member.user.tag}** has been banned by **${message.author.tag}**`);


	} else if (message.content.startsWith(config.prefix + 'kick')) {


		if (!message.member.roles.some(r => ["admin"].includes(r.name)))
			return message.reply("Sorry, you don't have permissions to use this!");

		let member = message.mentions.members.first();
		if (!member)
			return message.reply("Please mention a valid member of this server");
		if (!member.bannable)
			return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

		member.kick()

			.catch(error => message.reply(`Sorry **${message.author}** I couldn't kick because of : **${error}**`));

		message.channel.send(`**${member.user.tag}** has been kicked by **${message.author.tag}**`);


	} else if (message.content.startsWith('<please enter role>')) {

		setTimeout(deleteMessage, 10000, message);

	} else if (message.content.startsWith(config.prefix + 'doc')) {

		const args = message.content.slice(config.prefix.length + 4).split(' ');
		if (args[0] === '') {

			message.channel.send(`Please give page name`);

			setTimeout(deleteMessage, 10000, message);

		} else if (args[0] == 'seriesParallel' || args[0] == 'SPc') {

			message.channel.send(SPc);

		} else if (args[0] == 'seriesParallelBatteries' || args[0] == 'SPb') {

			message.channel.send(SPb);

		} else if (args[0] == 'resistors' || args[0] == 'Res') {

			message.channel.send(resistors);

		}

	} else if (message.content.startsWith('Please give page name')) {

		setTimeout(deleteMessage, 10000, message);

	} else if (message.content.startsWith('```')) {

		var msg = message.content;
		var original = message.author.username + '#' + message.author.discriminator;

		pastebin
			.createPaste(message.content.slice(3, msg.length - 6), `Code by ${original}`)
			.then(function (data) {
				// paste succesfully created, data contains the id
				message.channel.send(`Code moved to ${data}`);
				deleteMessage(message);
			})
			.fail(function (err) {
				// Something went wrong
				console.log(err);
			})

	} else if (message.content.startsWith(config.prefix + 'pastebin ')) {

		var msg = message.content;
		var original = message.author.username + '#' + message.author.discriminator;

		pastebin
			.createPaste(message.content.slice(10, msg.length), `Code by ${original}`)
			.then(function (data) {
				// paste succesfully created, data contains the id
				message.channel.send(`Code moved to ${data}`);
				deleteMessage(message);
			})
			.fail(function (err) {
				// Something went wrong
				console.log(err);
			})

	} else if (message.content.indexOf('```') > -1) {

		var msg = message.content;
		var start = msg.indexOf('```');
		var end = msg.slice(start + 3, msg.length).indexOf('```');
		var dif = end - start;
		if (dif >= config.warningTooLongCodeThreshold) {

			message.channel.send("I've noticed that your message contains a lot of code, please consider removing it from the original message and reposting the code to pastebin.com by using the command `!pastebin [your code]` to make the chat more cleaner and easy the life of the helpers. Thank you! (self-destructing in 10 seconds)");

		}

	} else if (message.content.startsWith("I've noticed that your message contains a lot of code, please consider removing it from the original message and reposting the code to pastebin.com by using the command `!pastebin [your code]` to make the chat more cleaner and easy the life of the helpers. Thank you! (self-destructing in 10 seconds)")) {

		setTimeout(deleteMessage, 10000, message);

	}
});

client.on("guildMemberAdd", (member) => {
	if (member.displayName.includes('discord.gg/')) {
		member.ban({ reason: 'Having your name as a discord invite link is not allowed' });
	} else {
		console.log(member + 'just joinned')

		const channel = member.guild.channels.find('name', config.spawn);
		channel.send("Welcome " + member + " to the Arduino official discord server! Please read the rules before continuing.");
	}

});

client.login(config.discordToken);