module.exports = (client) => {
  console.log('[Start] Arduino Bot ready for combat!')
  client.user.setPresence({
    game: {
      name: `Arduino | VER ${client.version}`,
      type: 'WATCHING'
    },
    status: 'online'
  })
}
