module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Cierre',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        dia:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        mes:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        tiempo:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        prod_bruta:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
    },{
        tableName:'cierre'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Proyecto);
        tabla.hasMany(models.Cierre_proyecto);
    }

    return tabla;
}