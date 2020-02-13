module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Actividades', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        actividad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tiempo_d: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        pro_ratea: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productiva:{
          type:DataTypes.BOOLEAN,
          allowNull:true
        }

    }, {
        tableName: 'actividades',
        timestamps: false,
    });
    tabla.associate = (models) => {

    };

    return tabla;
};