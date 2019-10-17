module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Actividad',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
        },
        actividad:{
            type:DataTypes.STRING,
            allowNull:false
        },
        tiempo_d:{
            type:DataTypes.FLOAT,
            allowNull:true
        },
        pro_ratea:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        productiva:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    },{
        tableName:'actividad'
    });
    tabla.associate = (models)=>{
        // tabla.belongsTo(models.Usuario);
    }

    return tabla;
}