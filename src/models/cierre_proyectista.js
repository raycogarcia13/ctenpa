module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Cierre_proyectista',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        anno:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        mes:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        acumulado_obras:{
            type:DataTypes.FLOAT,
            allowNull:false
        },

    },{
        tableName:'cierre_proyectista',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Sub_proyecto);
        tabla.belongsTo(models.Trabajador);
    };

    return tabla;
};
