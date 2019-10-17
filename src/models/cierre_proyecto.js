module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Cierre_proyecto',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
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
        tabla.belongsTo(models.Proyecto);
        tabla.hasMany(models.Cierre_proyectista);
    }

    return tabla;
}