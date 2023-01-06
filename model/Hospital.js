/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 9 */
const { Schema, model } = require("mongoose");
const HospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img:{
        type:String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
       
    },

});

HospitalSchema.method('toJSON', function() {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Hospital', HospitalSchema);