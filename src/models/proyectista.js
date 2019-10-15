module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Proyectista',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        apellidos:{
            type:DataTypes.STRING,
            allowNull:false
        },
        escala:{
            type:DataTypes.STRING,
            allowNull:false
        },
        cargo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        salario_b:{
            type:DataTypes.FLOAT,
            allowNull:false
        }
        
    },{
        tableName:'proyectista'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Usuario);
        tabla.belongsTo(models.Area);
        tabla.hasMany(models.Equipo);
        tabla.hasMany(models.Control_Activity);
    }

    return tabla;
}