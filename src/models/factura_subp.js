module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Area', {
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
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        empresa_id: {
            type: DataTypes.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'empresa',
                key: 'id'
            }
        },

    }, {
        tableName: 'area',
        timestamps: false,
    });

    return tabla;
};