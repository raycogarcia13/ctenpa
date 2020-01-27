module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Produccion_mes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        plan: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        plan_real: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        salario_mensual: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'produccion_mes'
    });
    tabla.associate = (models) => {
            tabla.belongsTo(models.Area);
        }
        //mas de una factura del mismo proyecto cada mes
    return tabla;
}