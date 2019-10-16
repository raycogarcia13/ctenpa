module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Feriados',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        fecha:{
            type:DataTypes.DATE,
            allowNull:false
        },
        motivo:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'dias_feriados'
    });
    tabla.associate = (models)=>{
    }

    return tabla;
}