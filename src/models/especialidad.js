module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Especialidad', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        codigo: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    }, {
        tableName: 'especialidad'
    });
    tabla.associate = (models) => {
        tabla.hasMany(models.Proyectista);
    }

    return tabla;
}