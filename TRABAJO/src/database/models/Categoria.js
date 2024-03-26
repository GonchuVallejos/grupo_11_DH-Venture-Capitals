/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataType} dataTypes 
 */

module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria'; // esto debería estar en singular
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
           
        }
       
       
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Categoria = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Categoria.associate = function (models){
        //marcando todas las relaciones con los otros modelos
        Categoria.belongsTo(models.Producto,{
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

    return Categoria
};