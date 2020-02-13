module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Factura_subp', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        valor: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        valor_cuc: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        }
    }, {
        tableName: 'factura_subp',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Sub_proyecto);
    };

    return tabla;
};