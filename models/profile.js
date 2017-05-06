// Load Module Dependencies
var mongoose = require('mongoose');


// Short cut to Schema
var Schema = mongoose.Schema;

// Define Profile Schema //
var ProfileSchema = new Schema({
  user:     { type: Schema.Types.ObjectId, ref: 'User' },
  picture :  { type: String },
  display_name: { type: String },
  first_name: { type: String },
  middle_name: { type: String },
  last_name:  { type: String },
  email:      { type: String },
  date_of_birth: { type: Date },
  addresses :    [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  gender:     { type: String },
  about:      { type: String },
  is_public:     { type: Boolean, default: false },
  last_modified: { type: Date },
  date_created:  { type: Date }
});


// Export Profile Model
module.exports = mongoose.model('Profile', ProfileSchema);
