const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { embed } = require('../bot')
const config = require('../config.json')

class MessageListener extends Listener {
  constructor() {
    super('message', {
      emitter: 'client',
      event: 'message'
    })
  }
    // Initial reaction for avrdude error
    if (message.content.toLowerCase() === "avrdude error" || message.content.toLowerCase() === "avr error") {
      message.channel.send(
        new MessageEmbed(embed)
          .setTitle('AVRDUDE Communication Error')
          .addFields(
            { name: 'For solving avrdude communication error you can try these.', value: '(In order)' },
            { name: '1.', value: 'If serial monitor is open, close it.' },
            { name: '2.', value: 'Try changing port you are connecting and selecting it from software, you can find it in tools -> port.',},
            { name: '3.', value: 'Try using the old bootloader. Go to tools -> processor and select 328p(old bootloader). If you are not on Nano, you can skip this step and try it after doing 4rd instruction. In that case select your board as nano before you try. (make sure you have a 328p chip board like uno).',},
            { name: '4.', value: 'If there\'s anything connected to Tx and Rx pins, try removing everything attached to them them.',},
            { name: '5.', value: 'This might just be a communication problem or your computer getting confused so try restarting your computer.',},
            { name: '6.', value: 'Check your drivers, sometimes just reinstalling them works. If you are using a clone board you might have CH340 communication chip, which isn\'t supported for Uno. You can check that by looking at your board and checking a chip\'s name(not the big one). For installing CH340 chip https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all . If you don\'t have CH340 chip you can try installing drivers from Windows device manager.',},
            { name: '7.', value: 'Last thing might be Arduino IDE\'s problem. If you think that\'s the case try reinstalling Arduino IDE.',},
          )
      )
    }
}

module.exports = MessageListener
