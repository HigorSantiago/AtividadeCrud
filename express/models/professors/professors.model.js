var mongoose = require('mongoose');

var ProfessorSchema = mongoose.Schema(
 {
 name: {type:String, required:true, max:10},
 university: {type:String, required:true, max:100},
 degree: {type:String, required:true, max:100},
 }
);

var ProfessorModel = mongoose.model('professors', ProfessorSchema);

module.exports = ProfessorModel;