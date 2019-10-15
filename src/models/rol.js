module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Rol',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        rol:{
            type:DataTypes.STRING,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'rol'
    });
    tabla.associate = (models)=>{
        tabla.hasMany(models.Usuario)
    }

    return tabla;
}