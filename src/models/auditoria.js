module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Auditoria', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: true
        },
        metodo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        qry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
        }, {
        tableName: 'auditoria',
        timestamps: false,
    });
    tabla.associate = (models)=>{
        tabla.belongsTo(models.Usuario);
    };

    return tabla;
};