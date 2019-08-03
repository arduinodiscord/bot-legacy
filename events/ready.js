module.exports = (client) => {
  console.log('[Start] Arduino Bot ready for combat!')
  client.user.setPresence({
    game: {
      //name: 'Arduino | !help',
      name: 'Arduino',
      type: 'WATCHING'
    },
    status: 'online'
  })
}
