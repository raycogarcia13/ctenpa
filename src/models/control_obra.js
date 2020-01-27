module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Control_Obra', {
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
        tableName: 'control_obra'
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Equipo);
    }

    return tabla;
}