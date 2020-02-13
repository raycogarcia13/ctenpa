module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Roles', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        tableName: 'roles',
        timestamps: false,
    });

    return tabla;
};