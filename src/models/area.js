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
        EmpresaId: {
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
    tabla.associate = (models) => {
        tabla.belongsTo(models.Empresa);
        tabla.hasMany(models.Usuario);
    };

    return tabla;
};