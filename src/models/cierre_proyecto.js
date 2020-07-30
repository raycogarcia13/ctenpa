module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Cierre_proyecto', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        mes:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        anno:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        horas_acumuladas: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        produccion_bruta: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        produccion_mercantil: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        produccion_cuc: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },

    }, {
        tableName: 'cierre_proyecto',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Proyectos);

    };

    return tabla;
};
