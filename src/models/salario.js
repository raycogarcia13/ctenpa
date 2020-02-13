module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Salario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        salario: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        salario_descuento: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        salario_resultado: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }

    }, {
        tableName: 'salario',
        timestamps: false,
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Trabajador);
    };

    return tabla;
};