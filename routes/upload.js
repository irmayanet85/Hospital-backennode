    /*jshint esversion: 6 */
    /*jshint esversion: 8 */
    const { Router } = require('express');
    
    const router = Router();
    
    const fileUpload = require('express-fileupload');

    const { uploadImage } = require('../controllers/controller.upload');
const { validarJWT } = require('../middlewares/validar-jwt');
  
    
    // default options
    router.use(fileUpload());

      //upload de fotos
    router.put('/:type/:id', validarJWT,uploadImage);
    
   
    
    module.exports = router;