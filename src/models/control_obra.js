module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Control_obra', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tiempo: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    }, {
        tableName: 'control_obra',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Equipo);
    };

    return tabla;
};