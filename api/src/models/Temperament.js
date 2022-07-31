const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', { //no se coloca id por que en este caso sequelize lo coloca por defecto y no  genera inconveniente
    name: {
      type: DataTypes.STRING,
      allowNull: true,//este campo es opcional

    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
});
};
