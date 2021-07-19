import { Listener } from 'discord-akairo';
import * as cache from '../utils/cache';
export class InviteCreateListener extends Listener {
    constructor() {
        super('inviteCreate', {
            emitter: 'client',
            event: 'inviteCreate'
        });
    }
    exec(invite) {
        cache.setInviteCache(invite.code, 0);
    }
}
//# sourceMappingURL=inviteCreate.js.map