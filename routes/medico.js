    /*jshint esversion: 6 */
    /*jshint esversion: 8 */
    const { Router } = require('express');
    const router = Router();
    const {check} = require('express-validator');
    const { crearMedico, deleteMedico, getMedico, listarMedico, updateMedico } = require('../controllers/controller.medico');
    const { validarCampos } = require('../middlewares/validar-campos');
    const { validarJWT } = require('../middlewares/validar-jwt');
    
    //crear un nuevo Medico
    router.post('/',[
      validarJWT,
      check('name', 'El nombre no puede ser vacio').not().isEmpty(),
      check('hospitales', 'Debe especificar un arreglo de hospitales valido').isArray().isMongoId(),
      validarCampos
    ], crearMedico);
    
    //eliminar Medico
    router.delete('/:id', validarJWT, deleteMedico);
    
    //update medico
    router.put('/:id', 
    [ validarJWT,
      check('name', 'El nombre es obligatorio').notEmpty(),
      check('hospitales', 'Debe especificar un arreglo de hospitales valido').isArray(),
      validarCampos
    ],
     updateMedico);
    
    // obtener un Medico
    router.get('/:id',validarJWT, getMedico);
    
    
    //listar medicos
    router.get('/', validarJWT, listarMedico);
    
    
    module.exports = router;
    