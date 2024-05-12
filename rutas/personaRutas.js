const express = require('express');
const rutas = express.Router();
const PersonaModel = require('../models/Personas');

//endpoint traer todas las recetas
rutas.get('/getPersonas' ,  async (req, res) => {
    try  {
        const persona = await  PersonaModel.find();//consulta
        res.json(persona);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
rutas.post('/crear',async (req,res)=>{
    const persona=new PersonaModel({
        nombres: req.body.nombres,
        primer_apellido: req.body.primer_apellido,
        segundo_apellido: req.body.segundo_apellido,
        ci: req.body.ci,
        direccion: req.body.direccion,
        celular : req.body.celular,
        edad : req.body.edad

    }); 
    //console.log(persona);
    try  {
        const nuevapersona = await  persona.save(); //consulta
        res.status(201).json(nuevapersona);
    } catch (error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/edit/:id',async (req,res)=>{
    //const id=req.params.id;
  
    try  {
        const editada = await  PersonaModel.findByIdAndUpdate(req.params.id,req.body,{new :true}); //consulta
        if(!editada){
           return  res.status(404).json({mensaje: 'no se encontro'});
        }else{
            //res.status(400).json(editada);
            res.json(editada);//devuelve pior defecto 200

        }

    } catch (error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id',async (req,res)=>{
     
   // min 75%
    try  {
        const eliminado = await PersonaModel.findByIdAndDelete(req.params.id) ;
        if(!eliminado) 
           return  res.status(404).json({mensaje: 'no se elimino'});
        else 
           return  res.json({mensaje: 'Receta eliminada'}); //devuelve pior defecto 200
 

    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

rutas.get('/buscarNombre/:nombre' ,  async (req, res) => {
    try  {
        const persona = await  PersonaModel.find({nombres:req.params.nombre});//consulta
        res.json(persona);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

rutas.get('/buscarLapaz' ,  async (req, res) => {
    try  {
        const persona = await  PersonaModel.find({direccion:'La Paz'});//consulta
        res.json(persona);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
rutas.get('/menoresEdad/:edad' ,  async (req, res) => {
    try  {
        const persona = await  PersonaModel.find({"edad":{$lt:req.params.edad}});//consulta
        res.json(persona);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

rutas.get('/buscar_edad_ciudad' ,  async (req, res) => {
    try  {
        const persona = await  PersonaModel.find({direccion:req.params.direccion, edad:req.params.edad});//consulta
        res.json(persona);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//rutas.post('',async (req,res)=>{ 
    // try  {
    //     const xx = await  persona.save(); //consulta
    //     res.status(201).json(xx);
    // } catch (error){
    //     res.status(500).json({mensaje: error.message});
    // }
//});

//mostrar los primeros 5
//mostrar todos los usiariso con nombre x
//mostrar orden alfabeico apellido y nombre 
//mostrar personas que contengan xxx

// mostrarr ceullares x
// const persona = await  PersonaModel.find({celular:123});//consulta 

//edad mayor a 6
//find({"edad":{$lt:6}})

module.exports = rutas;
