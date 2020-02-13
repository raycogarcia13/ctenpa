module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Control_actividades', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        dia:{
            type:DataTypes.STRING,
            allowNull:true
        },
        mes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tiempo: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'control_actividades',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Trabajador);
        tabla.belongsTo(models.Actividades);
    };


    return tabla;
};