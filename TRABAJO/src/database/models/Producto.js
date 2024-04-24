/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataType} dataTypes 
 */

module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        descripcion: {
            type: dataTypes.STRING(500)
           
        },
        historia: {
            type: dataTypes.STRING(500)
           
        },
        descuento: {
            type: dataTypes.DECIMAL(10, 2).UNSIGNED
        },
        imagen: {
            type: dataTypes.STRING(255)
        },
        requisitos: {
            type: dataTypes.STRING(500)
           
        },
        nombre: {
            type: dataTypes.STRING(255)
            
        },
        oferta: {
            type: dataTypes.BOOLEAN
            
        },
        precio: {
            type: dataTypes.DECIMAL(10, 1).UNSIGNED,
            
        },
       id_categoria: dataTypes.BIGINT(10)
    };
    let config = {
        tableName: "productos",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Producto = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Producto.associate = function (models){
        //marcando todas las relaciones con los otros modelos
        Producto.belongsTo(models.Categoria,{
            as: 'categoria',
            foreignKey: 'id_categoria'

        })

       /* Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id', 
            timestamps: false
        })*/
    }

    return Producto
};