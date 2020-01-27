module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Notificacion', {
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
        tableName: 'notificacion'
    });


    return tabla;
}