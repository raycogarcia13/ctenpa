module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Temporal', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

    }, {
        tableName: 'temporal',
        timestamps: false,
    });

    return tabla;
};