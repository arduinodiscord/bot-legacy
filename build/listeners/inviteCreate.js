var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Listener = require('discord-akairo').Listener;
var version = require('../package.json').version;
var config = require('../bot').config;
var cache = require('../utils/cache');
var InviteCreateListener = /** @class */ (function (_super) {
    __extends(InviteCreateListener, _super);
    function InviteCreateListener() {
        return _super.call(this, 'inviteCreate', {
            emitter: 'client',
            event: 'inviteCreate'
        }) || this;
    }
    InviteCreateListener.prototype.exec = function (invite) {
        cache.setInviteCache(invite.code, 0);
    };
    return InviteCreateListener;
}(Listener));
module.exports = InviteCreateListener;
