module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Proyectista', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        escala_salarial: {
            type: DataTypes.FLOAT,
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
        cargo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salario_basico: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        salario_hora: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    }, {
        tableName: 'proyectista'
    });
    tabla.associate = (models) => {
        tabla.belongsTo(models.Usuario);
        tabla.belongsTo(models.Especialidad);
        tabla.belongsTo(models.Area);
        tabla.hasMany(models.Equipo);
        tabla.hasMany(models.Control_Activity);
    }

    return tabla;
}