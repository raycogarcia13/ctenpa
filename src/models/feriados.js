module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Feriados', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        tableName: 'feriados',
        timestamps: false,
    });

    return tabla;
};