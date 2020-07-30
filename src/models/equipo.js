module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Equipo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'equipo',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsToMany(models.Sub_proyecto,{
            through: 'Asignacion',
            as: 'asigSubproyecto',
            foreignKey: 'SubProyectoId',
        });
        // tabla.belongsTo(models.Trabajador);
        tabla.hasMany(models.Asignacion);
    };

    return tabla;
};
