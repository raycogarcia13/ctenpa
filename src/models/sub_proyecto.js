module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Cierre', {
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
        mes:{
            type: DataTypes.STRING,
            allowNull: false
        },
        anno:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        produccion_bruta: {
            type: DataTypes.DECIMAL(10,2),
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
        tableName: 'cierre',
        timestamps: false,
    });

    return tabla;
};