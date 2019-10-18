module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Subproyecto',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        sub_valor:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },{
        tableName:'sub_proyecto'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Proyecto);
        tabla.belongsTo(models.Area);
        tabla.hasMany(models.Equipo);
        tabla.hasMany(models.Factura_Subproyecto);
    }

    return tabla;
}