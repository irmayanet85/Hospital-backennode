    /*jshint esversion: 6 */
    /*jshint esversion: 8 */
    const { Router } = require('express');
    const fileUpload = require('express-fileupload');

    const router = Router();
    
    const { downloadImage } = require('../controllers/controller.download');
const { validarJWT } = require('../middlewares/validar-jwt');

  
    
    // default options
    router.use(fileUpload());

      //download de fotos
    router.get('/:type/:nameimage',downloadImage);
    
   
    
    module.exports = router;