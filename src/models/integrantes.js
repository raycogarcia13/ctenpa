module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Integrantes', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        funcion:{
            type:DataTypes.STRING,
            allowNull:true
        }
    }, {
        tableName: 'integrantes',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Trabajador);
        tabla.belongsTo(models.Asignacion);
        // tabla.hasMany(models.Control_obra);
    };

    return tabla;
};
