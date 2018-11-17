const Discord = require('discord.js')
const Enmap = require('enmap')

const fs = require('fs')

module.exports = class Bot extends Discord.Client {
  constructor (options) {
    super(options)

    this.commands = new Enmap()
  }

  register () {
    fs.readdir(__dirname + '/../events/', (err, files) => {
      if (err)
        throw err

      for (let file of files) {
        if (!file.endsWith('.js'))
          return

        let event = require(`@event/${file}`)

        this.on(file.split('.')[0], event.bind(null, this))

        delete require.cache[require.resolve(`@event/${file}`)]
      }
    })

    fs.readdir(__dirname + '/../commands/', (err, files) => {
      if (err)
        throw err

      for (let file of files) {
        if (!file.endsWith('.js'))
          return

        let props = require(`@command/${file}`)

        this.commands.set(file.split('.')[0], props)
      }
    })

    return this
  }
}
