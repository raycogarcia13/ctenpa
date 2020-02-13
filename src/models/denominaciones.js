module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Denominaciones', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        denominacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        tableName: 'denominaciones',
        timestamps: false,
    });

    return tabla;
};