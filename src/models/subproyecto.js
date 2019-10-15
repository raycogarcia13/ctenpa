module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Subproyecto',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        sub_valor:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },{
        tableName:'sub_proyecto'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Proyecto);
        tabla.hasMany(models.Equipo);
    }

    return tabla;
}