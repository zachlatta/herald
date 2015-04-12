var herald = require('../');

herald.spawn()
    .then(function () {
        herald.login('user', 'pass');
    })
    .then(function () {
        herald.destroy()
            .then(function () {
                console.log('destroyed');
            })
    });
