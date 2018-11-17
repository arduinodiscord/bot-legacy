module.exports = (client) => {
  console.log('[Start]')
  client.user.setPresence({
    game: {
      name: 'Arduino | !help',
      type: 'WATCHING'
    },
    status: 'online'
  })
}
