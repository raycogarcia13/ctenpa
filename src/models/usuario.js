module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RolId: {
            type: DataTypes.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'rol',
                key: 'id'
            }
        },


    }, {
        tableName: 'usuario',
        timestamps: false,
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Rol);
        tabla.belongsTo(models.Area);
    };

    return tabla;
};