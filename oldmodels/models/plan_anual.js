module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Plan_anual', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        plan: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        plan_real: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        salario_anual: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    }, {
        tableName: 'plan_anual'
    });
    tabla.associate = (models) => {

        }
        //mas de una factura del mismo proyecto cada mes
    return tabla;
}