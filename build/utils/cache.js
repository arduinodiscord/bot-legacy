let inviteCache = {};
export const setInviteCache = (invite, uses) => {
    inviteCache = Object.assign(Object.assign({}, inviteCache), { [invite]: uses });
};
export const getInviteCache = (invite) => {
    return inviteCache[invite];
};
//# sourceMappingURL=cache.js.map