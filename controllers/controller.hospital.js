/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 9 */

const {response} = require ('express');
const Hospital = require('../model/Hospital');

const crearHospital = async (req, res= response)=>{
  const {name} = req.body;
  const usuario = req.id;

  try {
    
    const HospitalDB = new Hospital({name, usuario});
    
    await HospitalDB.save();
  
    return res.status(201).json({
      ok: true,
      msg:'Fue creado',
      id: HospitalDB.id,
      name : HospitalDB.name,
      usuario : HospitalDB.usuario
  
    }); 
            
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg:'Ocurrio un error inesperado',
  
    }); 
    
  }
    

  };

  
    
  const deleteHospital = async (req, res= response)=>{
    
    const id = req.params.id;

    try {
      let deleted = await Hospital.deleteOne({_id : id });
      
      if (deleted.deletedCount >= 1) {
        return res.status(201).json({
          ok: true,
          msg: `El Hospital con id: ${id} fue eliminado`,
       });
      } 
      else{
        return res.status(404).json({
          ok: false,
          msg: 'No pudo ser eliminado',
        });
      } 
      
    }
   
    catch (error) {
      console.log(error);
      res.status(500).json({
        ok:false,
        msg:'Error inesperado al borrar el Hospital'
      });
          
    }
      
  };

  const getHospital = async (req, res= response)=>{
    let id = req.params.id;

    console.log (id);
     
   let hospital = await Hospital.findById(id);
   if (hospital){
     console.log('hospital', hospital);
     return res.status(201).json({
       ok: true,
       hospital : hospital
     });
   }
   else{
     return res.status(404).json({
       ok: false,
       data : {}
     });
         
     
   }
   

};
const listarHospitales = async (req, res= response)=>{
    
      
  // let list = await Hospital.find()
  //                       .populate('usuario', 'name img');

  let from = Number(req.query.from)   || 0;
    //console.log(from);  
  
  const [list, total] = await Promise.all([
    Hospital
        .find().populate('usuario', 'name email img rol google')
        .skip(from),
  
    Hospital.count()
    ]);
  
      
    if (!list){
      console.log('No hay hospitales para listar');
      return res.status(204).json([]);
    }
    else{
        
      return res.status(200).json({
          list : list,
          total : total,
      });
    }

};


const updateHospital = async (req, res= response)=>{
  const uid = req.id;  
  const id = req.params.id;
  const {name} = req.body;
  const hospital = await Hospital.findById(id);
                                 
  if (hospital){
    const datachange = {
      ...req.body,
      usuario: uid
    };

    
    try {
     const HospitalUpdate =  await Hospital.findByIdAndUpdate(id,datachange, {new:true});

      return res.status(201).json({
          ok: true,
          hospital: HospitalUpdate,
    });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        msg: `Ocurrio un error inesperado intentando actualizar `,
      });  
    }
    
  }
  else{
    return res.status(404).json({
      ok: false,
      msg: `No existe un hospital con el id: ${id}`,
    });
  }

};


  module.exports = {
    crearHospital,
    deleteHospital,
    getHospital,
    listarHospitales,
    updateHospital

    
};