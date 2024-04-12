const {Sequelize, DataTypes} = require('sequelize');
 
//Conexion con SQLITE 3

const sequelize =  new Sequelize({
    dialect: "sqlite",
    storage:"./sisgeta.db",   
});

async function connect(){
    try{
        await sequelize.authenticate();

        console.log('> Conectado a la  base de datos :D');

    }catch(e){
        console.error('> No se pudo conectar con la base de datos :C');
        console.error(e);
    }
}
connect();


const Tarea=sequelize.define("tarea",{
 uuid:{
    type:DataTypes.UUID,
    unique:true,       
 },

//nombre_tarea:{
//     type:DataTypes.STRING(100),
//     allowNull:false,
//},

descripcion_mensaje:{
    type:DataTypes.STRING(100),
    allowNull:false,
},

//materiales:{
//    type:DataTypes.STRING(100),
//    allowNull:false,
//},

fecha_inicio:{
    type:DataTypes.DATE,
    allowNull:false,
},

fecha_fin:{
    type:DataTypes.DATE,
    allowNull:false,
},

avance:{
    type:DataTypes.INTEGER,
    defaultValue:0,
},

//id_estado:{
//    type:DataTypes.INTEGER,
//    defaultValue:0,
//},

//id_prioridad:{
    //type:DataTypes.INTEGER,
    //defaultValue:0,
//},

//horas:{
//    type:DataTypes.INTEGER,
//    defaultValue:0,
//},

//costo:{
 //   type:DataTypes.INTEGER,
//    defaultValue:0,
//},


} );

const Usuario=sequelize.define("usuario",{
    uuid:{
       type:DataTypes.UUID,
       unique:true,       
    },
   
   usuario:{
        type:DataTypes.STRING(10),
        allowNull:false,
        unique:true,
   },
   
   contraseña:{
       type:DataTypes.STRING(10),
       allowNull:false,
   },
   
   apellido_paterno:{
       type:DataTypes.STRING(100),
       allowNull:false,
   },
  
   apellido_materno:{
    type:DataTypes.STRING(100),
    allowNull:false,
   },

   nombre:{
    type:DataTypes.STRING(100),
    allowNull:false,
   },

   email:{
    type:DataTypes.STRING(50),
    allowNull:false,
   },

   telefono:{
    type:DataTypes.STRING(10),
    allowNull:false,
   },
   
   direccion:{
    type:DataTypes.STRING(100),
    allowNull:false,
   },

    curp:{
    type:DataTypes.STRING(18),
    allowNull:false,
   },
   
   foto:{
       type:DataTypes.BLOB,
       allowNull:false,
   },
   
   }, {timestamps:false,});

   
   const Cat_Area=sequelize.define("cat_area",{
    uuid:{
       type:DataTypes.UUID,
       unique:true,       
    },
   
   nombre:{
        type:DataTypes.STRING(50),
        allowNull:false,
   },
   
   descripcion:{
       type:DataTypes.STRING(100),
       allowNull:false,
   },
   } ,{timestamps:false,});

   
   const Cat_Prioridad=sequelize.define("cat_prioridad",{
    uuid:{
       type:DataTypes.UUID,
       unique:true,       
    },
   
   nombre:{
        type:DataTypes.STRING(50),
        allowNull:false,
   },
   
   descripcion:{
       type:DataTypes.STRING(100),
       allowNull:false,
   },
   } ,{timestamps:false,});

   const Cat_Tipo=sequelize.define("cat_tipo",{
    uuid:{
       type:DataTypes.UUID,
       unique:true,       
    },
   
   nombre:{
        type:DataTypes.STRING(50),
        allowNull:false,
   },
   
   descripcion:{
       type:DataTypes.STRING(100),
       allowNull:false,
   },
   } ,{timestamps:false,});


   const Cat_Estado=sequelize.define("cat_estado",{
    uuid:{
       type:DataTypes.UUID,
       unique:true,       
    },
   
   nombre:{
        type:DataTypes.STRING(50),
        allowNull:false,
   },
   
   descripcion:{
       type:DataTypes.STRING(100),
       allowNull:false,
   },
   } ,{timestamps:false,});

   const Cat_Tarea=sequelize.define("cat_tarea",{
    uuid:{
       type:DataTypes.UUID,
       unique:true,       
    },
   
   nombre:{
        type:DataTypes.STRING(50),
        allowNull:false,
   },
   
   descripcion:{
       type:DataTypes.STRING(100),
       allowNull:false,
   },
   } ,{timestamps:false,});



   Cat_Area.hasMany(Usuario); 
   Usuario.belongsTo(Cat_Area);
   
   Cat_Tipo.hasMany(Usuario); 
   Usuario.belongsTo(Cat_Tipo);
   
   //********************************* */

   Cat_Estado.hasMany(Tarea); 
   Tarea.belongsTo(Cat_Estado);
   
   Cat_Prioridad.hasMany(Tarea); 
   Tarea.belongsTo(Cat_Prioridad);

   Cat_Tarea.hasMany(Tarea); 
   Tarea.belongsTo(Cat_Tarea);

   Usuario.hasOne(Usuario,{as:"lider", foreignkey:"id"});

   Usuario.belongsToMany(Tarea,{through:"Asignacion",timestamps:false});
   Tarea.belongsToMany(Usuario,{through:"Asignacion",timestamps:false});

   Usuario.hasOne(Tarea,{as:"creador", foreignkey:"id"});
   
   

   
   
   
   


   //Usuario.hasMany(Usuario); // A HasMany B
  // Usuario.belongsToMany(Usuario, { through: 'lider_colaborador' });
   

async function sync(){
    try{
        await sequelize.sync({force:true});//jrp_romero forza los cambios en la base
        console.log(">Base de datos actualizada");        
    } catch(e){
        console.error('> No se actualizar la base de datos :C');
        console.error(e);
    }

}

sync();







