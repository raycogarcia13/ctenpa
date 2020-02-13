module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Sub_proyecto', {
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
        sub_valor: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        terminado:{
            type:DataTypes.BOOLEAN,
            allowNull:true
        }
        }, {
        tableName: 'sub_proyecto',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Area);
        tabla.belongsTo(models.Proyectos);
        tabla.hasMany(models.Equipo);
        tabla.hasMany(models.Factura_subp);
    };

    return tabla;
};