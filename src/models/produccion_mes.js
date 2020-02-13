module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Produccion_mes', {
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
        plan: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        plan_real: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        salario_mensual: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        horas_mensual: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    }, {
        tableName: 'produccion_mes',
        timestamps: false,
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Area);
    };
    return tabla;
};