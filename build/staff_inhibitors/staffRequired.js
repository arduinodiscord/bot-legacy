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
var Inhibitor = require('discord-akairo').Inhibitor;
var config = require('../bot').config;
var StaffRequiredInhibitor = /** @class */ (function (_super) {
    __extends(StaffRequiredInhibitor, _super);
    function StaffRequiredInhibitor() {
        return _super.call(this, 'staffRequired', {
            reason: 'staffRoleRequired',
            type: 'post'
        }) || this;
    }
    StaffRequiredInhibitor.prototype.exec = function (message, command) {
        var member = message.guild.members.cache.find(function (member) { return member.id === message.author.id; });
        var roleAbsent = function (roleId) {
            if (member.roles.cache.find(function (role) { return role.id === roleId; })) {
                return false;
            }
            else {
                return true;
            }
        };
        if (command.id === "gist") {
            return roleAbsent(config.roles.helper);
        }
        else {
            return roleAbsent(config.roles.staff);
        }
    };
    return StaffRequiredInhibitor;
}(Inhibitor));
module.exports = StaffRequiredInhibitor;
