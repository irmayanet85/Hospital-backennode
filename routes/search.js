    /*jshint esversion: 6 */
    /*jshint esversion: 8 */
    const { Router } = require('express');
    const {  searchEnyThing } = require('../controllers/controller.search');
    const router = Router();
   
    const { validarJWT } = require('../middlewares/validar-jwt');
  
      
      //Login de usuario
    router.get('/:value', [    
    ], validarJWT,searchEnyThing);
    
   
    
    module.exports = router;