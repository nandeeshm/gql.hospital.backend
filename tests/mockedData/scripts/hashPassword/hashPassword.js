"use strict";
exports.__esModule = true;
var bcrypt = require("bcryptjs");
var plainPasswords = process.argv.slice(2);
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.hashPassword = function (password, rounds, callback) {
        bcrypt.hash(password, rounds, function (error, hash) {
            callback(error, hash);
        });
    };
    return Auth;
}());
exports["default"] = Auth;
plainPasswords.map(function (password) {
    Auth.hashPassword(password, 1, function (error, hash) {
        if (error) {
            console.log('[ERROR] - There was an error hashing the password.', error.message);
        }
        else {
            console.log("[ INFO] - " + password + " == hased ==> " + hash);
        }
    });
});
