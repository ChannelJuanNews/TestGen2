var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  section_id  : { type : String, required : true},
  gu_id       : { type : String, required : true},
  body        : { type : String, required : true},
  answer      : { type : String, required : true},
  level       : { type : String, required : true},
  type        : { type : String, required : true},
  author      : { type : String, required : true},
  reviewer    : { type : String, required : true},
  last_used   : { type : String, required : true}
});

module.exports = mongoose.model('Question', questionSchema)
