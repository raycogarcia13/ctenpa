module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Especialidad', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:true
        }

    }, {
        tableName: 'especialidad',
        timestamps: false,
    });
    tabla.associate = (models) => {
        tabla.hasMany(models.Trabajador);
    };

    return tabla;
};