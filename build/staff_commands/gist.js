import { Command } from 'discord-akairo';
import { embed } from '../bot';
import { MessageEmbed } from 'discord.js';
//@ts-ignore
import Gists from 'gists';
const gists = new Gists({
    token: process.env.GITHUB_TOKEN
});
export class GistCommand extends Command {
    constructor() {
        super('gist', {
            aliases: ['gist', 'paste'],
            channel: 'guild',
            description: 'Command for helpers to paste any message to a gist.',
            args: [
                {
                    id: 'message',
                    type: 'message'
                }
            ],
        });
    }
    exec(message, args) {
        if (args.message) {
            var code = args.message;
            gists.create({
                "description": `Code by ${code.author.tag} - ${new Date()}`,
                "public": true,
                "files": {
                    "ArduinoDiscordBot.md": {
                        "content": `## This gist was pasted by the Arduino discord server bot.
          \n[![](https://img.shields.io/github/issues/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/issues) [![](https://img.shields.io/github/forks/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/stars/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot) [![](https://img.shields.io/github/license/BluLightShow/arduino-bot)](https://github.com/BluLightShow/arduino-bot/blob/master/LICENSE) [![](https://user-images.githubusercontent.com/7288322/34429152-141689f8-ecb9-11e7-8003-b5a10a5fcb29.png)](http://arduino.cc/discord)
          \n> **This gist was automatically pasted at the request of one of the discord server helpers. If you have any suggestions or bugs to report, you can do so on our [GitHub](https://github.com/BluLightShow/arduino-bot/ "GitHub page") repository, or in our discord server. This project is run by volunteers so feel free to fork and commit your changes then open a pull request!**
          \n------------
          \n# ⬇️ Pasted Code ⬇️`
                    },
                    "MessagePaste.cpp": {
                        "content": code.content
                    }
                }
            }).then((gist) => {
                message.channel.send(new MessageEmbed(embed)
                    .setTimestamp(new Date())
                    .setTitle('Requested message was successfully pasted to gist!')
                    .setDescription(`**${gist.body.html_url}**`)
                    .setAuthor(`Code by ${code.author.tag}`, code.author.avatarURL({ dynamic: true }))
                    .addField('Paste requested by:', message.author.tag, true)).then(() => {
                    code.delete().catch((err) => console.error(err));
                });
            });
        }
    }
}
//# sourceMappingURL=gist.js.map