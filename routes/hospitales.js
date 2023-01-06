    /*jshint esversion: 6 */
    /*jshint esversion: 8 */
    const { Router } = require('express');
    //const { crearUsuario } = require('../controllers/controller.usuario');
    const router = Router();
    const {check} = require('express-validator');
    const { crearHospital, deleteHospital, getHospital, listarHospitales, updateHospital } = require('../controllers/controller.hospital');
    const { validarCampos } = require('../middlewares/validar-campos');
    const { validarJWT } = require('../middlewares/validar-jwt');
const { validarUsuarioExist } = require('../middlewares/validar-usuarioExistente');
    
    //crear un nuevo hospital
    router.post('/',[
      validarJWT,
      check('name', 'El nombre no puede ser vacio').not().isEmpty(),
      validarCampos
    ], validarUsuarioExist,crearHospital);
    
    //eliminar hospital
    router.delete('/:id', validarJWT, deleteHospital);
    
    //update hospital
    router.put('/:id', 
    [ validarJWT,
      check('name', 'El nombre es obligatorio').notEmpty(),
      validarCampos
    ],updateHospital);
    
    // obtener un hospital
    router.get('/:id',validarJWT, getHospital);
    
    
    //listar hospitales
    router.get('/', validarJWT, listarHospitales);
    
    module.exports = router;
    