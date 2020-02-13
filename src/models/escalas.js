module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Escalas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        escala: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        }

    }, {
        tableName: 'escalas',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Cargo);

    };
    return tabla;
};