let inviteCache:any = {}

export const setInviteCache = (invite:any, uses:any) => {
  inviteCache = {...inviteCache, [invite]: uses}
}

export const getInviteCache = (invite:any) => {
  return inviteCache[invite]
}