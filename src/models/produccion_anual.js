module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('produccion_mes', {
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
        },
        area_id: {
            type: DataTypes.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'area',
                key: 'id'
            }
        },

    }, {
        tableName: 'actividades',
        timestamps: false,
    });

    return tabla;
};