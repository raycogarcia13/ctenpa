module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Cierre_proyectista',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        prod_mercantil:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        prod_cuc:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
    },{
        tableName:'cierre_proyecto'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Cierre_proyecto);
    }

    return tabla;
}