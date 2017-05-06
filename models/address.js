/**
 * Created by Yido on 2/25/2017.
 */
//~ Load module dependencies ~//
var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

//~ Define Address Attributes ~//

var AddressSchema = new Schema({
    name : {type: String},
    picture :  { type: String },
    loc:  {
        lon:  { type: Number },
        lat:  { type: Number}
    },
    is_main:     { type: Boolean, default: false },
    unique_id: { type: String },
    owner:      { type: Schema.Types.ObjectId, ref: 'Profile' },
    date_created : {type : Date, default: Date.now },
    date_modified : {type : Date, default: Date.now }
});

//~ Export Address Model ~//
module.exports = mongoose.model('Address',AddressSchema);
