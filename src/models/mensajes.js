module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Mensaje', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        remitente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destino: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cuerpo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'mensaje'
    });

    return tabla;
}