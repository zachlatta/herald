var phridge = require('phridge');
var Promise = require('bluebird');

var exports = module.exports = {};
var phantom = null;

exports.spawn = function () {
    return phridge.spawn()
        .then(function (p) {
            phantom = p;
        });
};

exports.destroy = function () {
    return phridge.disposeAll();
};

exports.login = function (username, password) {
    return phantom.openPage('https://www.messenger.com')
        .then(function (page) {
            return page.run(function () {
                return this.evaluate(function () {
                    document.querySelector("#email").value = username;
                    document.querySelector("#pass").value = password;
                    document.querySelector("#loginbutton").click();
                });
            })
        })
        .then(function (page) {
            return this.evaluate(function () {
                return document.location.href;
            });
        })
        .then(function (url) {
            console.log(url);
        });
};
