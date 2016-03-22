var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.log(err);
    }
});

require('./model/order');

module.exports.Order = mongoose.model('Order');