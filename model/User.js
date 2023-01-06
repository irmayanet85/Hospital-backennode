/*jshint esversion: 6 */
/*jshint esversion: 8 */
const { Schema, model } = require("mongoose");

const UsuariosSchema = Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    img:{
        type:String,
        require: true
    },
    rol:{
        type:String,
        default: 'USER_ROLE',
        require: true
    },
    google:{
        type:Boolean,
        default: false,
        require: true
    }

});

UsuariosSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Usuario', UsuariosSchema);