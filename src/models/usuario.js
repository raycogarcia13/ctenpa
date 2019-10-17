module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Usuario',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        }
    },{
        tableName:'usuario'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Rol);
    }

    return tabla;
}