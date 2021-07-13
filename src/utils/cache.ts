var inviteCache = {}

var setInviteCache = (invite, uses) => {
  inviteCache = {...inviteCache, [invite]: uses}
}

var getInviteCache = (invite) => {
  return inviteCache[invite]
}

export = {
  setInviteCache,
  getInviteCache
}