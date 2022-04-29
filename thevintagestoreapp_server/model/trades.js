const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const tradeSchema = new Schema({
    buyer_id: {type: Schema.Types.ObjectId, required: [true, 'buyer is required']},
    buyer_name: {type: String, required: [true, 'seller is required']},
    seller_id: {type: Schema.Types.ObjectId, required: [true, 'seller_id is required']},
    seller_name: {type: String, required: [true, 'seller is required']},
    requested_product_id: { type: String, required: [true, 'requested product_id is required']},
    requested_product_name: {type: String, required: [true, 'requested_product_name is required']},
    offered_product_name: {type: String, required: [true, 'offered_product_name is required']},
    offered_product_id: { type: String, required: [true, 'offered product_id is required']},
    status: { type: String, default:"pending" }
}
);

//collection name is stories in the database
module.exports = mongoose.model('Trade', tradeSchema);