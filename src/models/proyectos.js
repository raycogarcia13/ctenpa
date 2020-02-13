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
        },
        cargo_id: {
            type: DataTypes.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'cargo',
                key: 'id'
            }
        },
        especialidad_id: {
            type: DataTypes.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'especialidad',
                key: 'id'
            }
        },
        area_id: {
            type: DataTypes.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'area',
                key: 'id'
            }
        },
        denominacion_id: {
            type: DataTypes.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'denominaciones',
                key: 'id'
            }
        },

    }, {
        tableName: 'trabajador',
        timestamps: false,
    });

    return tabla;
};