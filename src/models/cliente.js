module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Cliente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        programa: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'cliente'
    });
    tabla.associate = (models) => {
        tabla.hasMany(models.Contrato)
    }

    return tabla;
}