module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Control_Activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 31
            }
        },
        mes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 12
            }
        },
        anno: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        tiempo: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'control_activity'
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Proyectista);
        tabla.belongsTo(models.Actividad);
    }

    return tabla;
}