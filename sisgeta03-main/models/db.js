const {Sequelize}=require('sequelize');

const sequelize= new Sequelize({
  dialect:"sqlite",
  storage:"../sisgeta.db",

});

exports.sequelize=sequelize;


exports.connect= async function(){
    try{
        await sequelize.authenticate();

        console.log('> Conectado a la  base de datos :D');

    }catch(e){
        console.error('> No se pudo conectar con la base de datos :C');
        console.error(e);
    }

};

exports.sync=async function () {
    try{
        await sequelize.sync({force:true});//jrp_romero forza los cambios en la base
        console.log(">Base de datos actualizada");        
    } catch(e){
        console.error('> No se actualizar la base de datos :C');
        console.error(e);
    }
};

