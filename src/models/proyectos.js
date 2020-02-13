module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Proyectos', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor_total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        terminado:{
            type:DataTypes.BOOLEAN,
            allowNull:true
        }
    }, {
        tableName: 'proyectos',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Contratos);
        tabla.belongsTo(models.Estados);
        tabla.hasMany(models.Sub_proyecto);
    };

    return tabla;
};