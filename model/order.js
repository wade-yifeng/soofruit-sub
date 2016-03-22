var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    type: String,
    cname: String,
    expressNo : String,
    order_date: {type: Date, default: Date.now}
});
OrderSchema.index({order_date: -1});

mongoose.model('Order', OrderSchema);