module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Factura_Subproyecto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        valor_cuc: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'factura_subp'
    });
    tabla.associate = (models) => {
            tabla.belongsTo(models.Subproyecto);
        }
        //mas de una factura del mismo proyecto cada mes
    return tabla;
}