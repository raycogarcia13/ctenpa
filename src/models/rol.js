module.exports = (sequelize , DataTypes) =>{
    const Rol = sequelize.define('Rol',{
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
    Rol.associate = (models)=>{

    }

    return Rol;
}