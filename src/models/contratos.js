module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Contratos', {
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
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        fecha_cierre: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: sequelize.NOW
        },

        codigo_tratos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'contratos',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Cliente);
    };
    return tabla;
};