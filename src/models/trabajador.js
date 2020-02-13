module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Trabajador', {
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
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        perfec_empresarial: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        coeficiente: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        salario_basico: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        salario_hora: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'trabajador',
        timestamps: false,
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Cargo);
        tabla.belongsTo(models.Especialidad);
        tabla.belongsTo(models.Area);
        tabla.belongsTo(models.Denominaciones);
        tabla.belongsTo(models.Usuario);
        tabla.hasMany(models.Control_actividades);
        tabla.hasMany(models.Equipo);
    };

    return tabla;
};