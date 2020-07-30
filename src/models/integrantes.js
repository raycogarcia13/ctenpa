module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Asignacion', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

    }, {
        tableName: 'asignacion',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Sub_proyecto);
        tabla.belongsTo(models.Equipo);
        // tabla.hasMany(models.Control_obra);
    };

    return tabla;
};
