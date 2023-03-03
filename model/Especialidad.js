/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 9 */
const { Schema, model } = require("mongoose");
const SpecialtySchema = Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
   

});

SpecialtySchema.method('toJSON', function() {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Specialty', SpecialtySchema);