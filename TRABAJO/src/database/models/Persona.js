/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} dataTypes 
 * 
 */

module.exports = (sequelize, dataTypes) => {
    let alias = 'Persona'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        apellido: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        tipo_doc: {
            type: dataTypes.STRING(3),
            allowNull: false
        },
        dni: {
            type: dataTypes.STRING(8),
            allowNull: false
        },
        domicilio: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        fecha_nac: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        sexo: {
            type: dataTypes.STRING(1),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: dataTypes.STRING(11),
            allowNull: false
        },
        estado: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        }
    };
    let config = {
        tableName: "personas",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Persona = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos

    Persona.associate = function (models) {
        //Marcando la relaciones con los otros modelos - Se usa hasMany, porque la Persona tiene muchos usuarios
        Persona.hasMany(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'id_persona'
        })
    }

    return Persona
};