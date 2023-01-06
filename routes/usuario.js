    /*jshint esversion: 6 */
    /*jshint esversion: 8 */
    const { Router } = require('express');
    const { crearUsuario } = require('../controllers/controller.usuario');
    const router = Router();
    const {check} = require('express-validator');
    const { validarCampos } = require('../middlewares/validar-campos');
    const { listarUsuario, deleteUsuario, updateUser, getUsuario, updateRolUser } = require('../controllers/controller.crud');
    const { validarEmailnotExist } = require('../middlewares/validar-correoUnic');
    const { validarJWT } = require('../middlewares/validar-jwt');
const { isUserAdmin } = require('../middlewares/validar-isAdmin');
    
    //crear un nuevo usuario
    router.post('/',[
      check('email', 'Debe ser un email valido').isEmail(),
      check('password', 'Debe especificar un password mayor a 6 caracteres').isLength(6),
      check('name', 'El nombre no puede ser vacio').not().isEmpty(),
      validarCampos
    ],validarEmailnotExist , crearUsuario);
    
    //eliminar usuario
    router.delete('/:id', validarJWT, deleteUsuario);
    
    //update usuario
    router.put('/:id', 
    [ validarJWT,
      check('name', 'El nombre es obligatorio').notEmpty(),
      check('email', 'El email es obligatorio').notEmpty().isEmail(),
      validarCampos
    ],
     validarEmailnotExist,
     updateUser);

     //change rol usuario
    router.put('/role/:id', 
    [ validarJWT,
      check('rol', 'El rol es obligatorio').notEmpty(),
      validarCampos
    ],isUserAdmin,updateRolUser);
    
    //obtener un usuario
    router.get('/:id',validarJWT, getUsuario);
    
    
    //listar usuarios
    router.get('/', validarJWT, listarUsuario);
    
    
    module.exports = router;
    