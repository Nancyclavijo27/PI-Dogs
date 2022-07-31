const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type:DataTypes.UUID, //numero randon con letras y numeros que no se repite UUID
      defaultValue:DataTypes.UUIDV4, //predeterminado
      allowNull:false,//este campo es requerido
      primaryKey:true //clave primaria
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,//este campo es requerido
      unique:true,
    },
    heightMin: {
      type: DataTypes.STRING, // el tipo de dato depende endpoint del api perros
      allowNull: false,//este campo es requerido
    },
    heightMax: {
      type: DataTypes.STRING, // el tipo de dato depende endpoint del api perros
      allowNull: false,//este campo es requerido
    },
    weightMin: {
      type: DataTypes.STRING,
      allowNull: false,//este campo es requerido
    },
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false,//este campo es requerido
    },
    life_spanMin: {
      type: DataTypes.STRING,
    }, 
    life_spanMax: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,//este campo es requerido
    },
    createdInDb:{  //creado en bd es mas facial saber que se creo en bd, todo lo que yo cree se crea con esta propiedad
      type:DataTypes.BOOLEAN,
    
      defaultValue:true
    }
  });
};
