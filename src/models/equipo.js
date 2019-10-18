module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Equipo',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
        },
        funcion:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },{
        tableName:'equipo'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Subproyecto);
        tabla.belongsTo(models.Proyectista);
        tabla.hasMany(models.Control_Obra);
    }

    return tabla;
}