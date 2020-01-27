module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Contrato', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_incio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_cierre: {
            type: DataTypes.DATE,
            allowNull: true
        },
        cod_tratos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    }, {
        tableName: 'contrato'
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Cliente);
    }

    return tabla;
}