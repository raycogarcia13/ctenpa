module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Cliente', {
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
        programa: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'cliente',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.hasMany(models.Contratos)
    };

    return tabla;
};