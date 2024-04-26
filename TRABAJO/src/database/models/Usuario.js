/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} dataTypes 
 * 
 */

module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_usuario: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        id_persona: dataTypes.BIGINT(10),
        id_rol: dataTypes.BIGINT(10)
    };
    let config = {
        tableName: "usuarios",
        timestamps: false,
        paranoid: true
    }
    const Usuario = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos

    Usuario.associate = function (models) {
        //Marcando la relaciones con los otros modelos  - Se usa belongsTo, porque el los usuarios tienen Personas y Roles
        Usuario.belongsTo(models.Persona, {
            as: 'persona',
            foreignKey: 'id_persona'
        })
        Usuario.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'id_rol'
        })
        /*Marcando la relaciones con los otros modelos - Se usa hasMany, porque el Usuario tiene muchos carritos de compra
        Usuario.hasMany(models.Carrito_compras, {
            as: 'carrito_compras',
            foreignKey: 'id_usuario'
        })*/
    }

    return Usuario
};