module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Temporal', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        tableName: 'temporal'
    });
    tabla.associate = (models) => {

    }

    return tabla;
}