    /*jshint esversion: 6 */
    /*jshint esversion: 8 */
    const { Router } = require('express');
    const { loginUsuario, renewToken } = require('../controllers/controller.usuario');
    const router = Router();
    const {check} = require('express-validator');
    const { validarCampos } = require('../middlewares/validar-campos');
    const { validarJWT } = require('../middlewares/validar-jwt');
  
      
      //Login de usuario
    router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'Debe introducir una contraseña').isLength(1),
        validarCampos
    ],loginUsuario);
    
     //revalidar token
    router.get('/renew', validarJWT , renewToken);
    
    module.exports = router;