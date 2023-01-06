/*jshint esversion: 6 */
/*jshint esversion: 8 */
const jwt = require ('jsonwebtoken');

const BuildJWT = ( id , name ) => {

    const payload = { id , name };

    return new Promise( (resolve,reject ) => {

        
        jwt.sign ( payload, process.env.MYSECRETE, {
        expiresIn: '12h'
        }, (err, token) => {

                if ( err){
                    console.log(err);
                    reject(err);
                }
                else{

                    resolve(token);
                }
            });
    });
 
    
};

module.exports = {
    BuildJWT
};