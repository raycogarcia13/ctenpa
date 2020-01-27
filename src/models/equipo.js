module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Equipo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        funcion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'equipo'
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Subproyecto);
        tabla.belongsTo(models.Proyectista);
        tabla.hasMany(models.Control_Obra);
    }

    return tabla;
}