module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Mensaje',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
        },
        remitente:{
            type:DataTypes.STRING,
            allowNull:false
        },
        destino:{
            type:DataTypes.STRING,
            allowNull:false
        },
        cuerpo:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'mensaje'
    });  

    return tabla;
}