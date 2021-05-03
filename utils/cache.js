var inviteCache = {}

var setInviteCache = (invite, uses) => {
  inviteCache = {...inviteCache, [invite]: uses}
}

var getInviteCache = (invite) => {
  console.log(inviteCache)
  return inviteCache[invite]
}

module.exports = {
  setInviteCache,
  getInviteCache
}