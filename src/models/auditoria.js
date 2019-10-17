module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Auditoria',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        ip:{
            type:DataTypes.STRING,
            allowNull:false
        },
        action:{
            type:DataTypes.STRING,
            allowNull:false
        },
        metodo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        qry:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        url:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        }

    },{
        tableName:'auditoria'
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Usuario);
    }

    return tabla;
}