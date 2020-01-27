module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Salario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        salario_descuento: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        salario_resultado: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        anno: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        tableName: 'salario'
    });
    tabla.associate = (models) => {
            tabla.belongsTo(models.Proyectista);
        }
        //mas de una factura del mismo proyecto cada mes
    return tabla;
}