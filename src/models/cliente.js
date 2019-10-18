module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Cliente',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        programa:{
            type:DataTypes.STRING,
            allowNull:false
        }        
    },{
        tableName:'cliente'
    });
    tabla.associate = (models)=>{
        tabla.hasMany(models.Contrato)
    }

    return tabla;
}