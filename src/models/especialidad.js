module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Especialidad', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
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