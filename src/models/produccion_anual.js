module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Produccion_anual', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        anno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        plan: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        salario_medio: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        tableName: 'produccion_anual',
        timestamps: false,
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Empresa);
    };

    return tabla;
};