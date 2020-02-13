module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Equipo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        funcion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'equipo',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Sub_proyecto);
        tabla.belongsTo(models.Trabajador);
        tabla.hasMany(models.Control_obra);
    };

    return tabla;
};