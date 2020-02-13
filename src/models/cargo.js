module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Cargo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        tableName: 'cargo',
        timestamps: false,
    });

    return tabla;
};