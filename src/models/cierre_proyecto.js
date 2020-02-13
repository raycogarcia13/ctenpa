module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Cierre_proyecto', {
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
        produccion_mercantil: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        produccion_cuc: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },

    }, {
        tableName: 'cierre_proyecto',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Trabajador);
        tabla.hasMany(models.Cierre_proyectista);
    }

    return tabla;
};