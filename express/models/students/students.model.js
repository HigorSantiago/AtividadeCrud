var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema(
 {
 name: {type:String, required:true, max:10},
 course: {type:String, required:true, max:100},
 ira: {type:Number, required:true, max:100},
 }
);

var StudentModel = mongoose.model('students', StudentSchema);

module.exports = StudentModel;