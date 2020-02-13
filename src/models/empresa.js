module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Empresa', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        objeto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mision: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vision: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    }, {
        tableName: 'empresa',
        timestamps: false,
    });

    return tabla;
};