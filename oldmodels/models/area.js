module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Area', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'area'
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Usuario);
    }

    return tabla;
}