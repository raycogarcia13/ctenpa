module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Proyecto',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        valor_total:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },{
        tableName:'proyecto'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Contrato);
        tabla.hasMany(models.Subproyecto);
    }

    return tabla;
}