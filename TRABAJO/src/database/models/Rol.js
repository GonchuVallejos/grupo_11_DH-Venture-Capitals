/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} dataTypes 
 * 
 */

module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        descripcion: {
            type: dataTypes.STRING(20),
            allowNull: false
        }
    };
    let config = {
        tableName: "Roles",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Rol = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos

    Rol.associate = function (models) {
        //Marcando la relaciones con los otros modelos - Se usa hasMany, porque el Rol tiene muchos usuarios
        Rol.hasMany(models.Usuario, {
            as: 'usuario',
            foreignKey: 'id_rol'
        })
    }

    return Rol
};