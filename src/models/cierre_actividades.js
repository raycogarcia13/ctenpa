module.exports = (sequelize , DataTypes) =>{
    const tabla = sequelize.define('Cierre_actividades',{
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
        acumulado_actividades:{
            type:DataTypes.FLOAT,
            allowNull:false
        },

    },{
        tableName:'cierre_actividades',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Actividades);
        tabla.belongsTo(models.Trabajador);
    };

    return tabla;
};
