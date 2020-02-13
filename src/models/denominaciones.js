module.exports = (sequelize, DataTypes) => {
    const tabla = sequelize.define('Escalas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        escala: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: '(now'
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

    }, {
        tableName: 'escalas',
        timestamps: false,
    });

    return tabla;
};