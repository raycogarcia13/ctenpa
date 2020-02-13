module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Estados', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        tableName: 'estados',
        timestamps: false,
    });

    return tabla;
};