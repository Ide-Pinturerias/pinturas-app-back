const { Op } = require('sequelize');
const { Products } = require('#DB_CONNECTION');
const PRODUCTS_PER_PAGE = 12;

const filterAndOrderProductsController = async ({
    name, category,
    lowPrice, highPrice,
    minRating, maxRating,
    minStock, maxStock,
    page, color,
    active, limit,
    sortBy, orderBy
}) => {
    const pageSet = page || 1; // Página actual, por defecto 1
    const offset = (pageSet - 1) * PRODUCTS_PER_PAGE;

    // Construir la condición de búsqueda para los términos proporcionados
    const searchCondition = {
        // Busqueda por nombre
        ...(name
            ? {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
            : {}),
        // Búsqueda por categoría si se proporciona una categoría específica
        ...(category && { category }),

        // Búsqueda por color
        ...(color && { color }),

        // Búsqueda por activos
        ...(active && { active }),

        // Búsqueda por rango de precios
        ...((lowPrice && highPrice)
            ? {
                price: {
                    [Op.between]: [lowPrice, highPrice]
                }
            }
            : (lowPrice
                ? {
                    price: {
                        [Op.gte]: lowPrice
                    }
                }
                : (highPrice
                    ? {
                        price: {
                            [Op.lte]: highPrice
                        }
                    }
                    : {}))),

        // Búsqueda por rating
        ...((minRating && maxRating)
            ? {
                rating: {
                    [Op.between]: [minRating, maxRating]
                }
            }
            : (minRating
                ? {
                    rating: {
                        [Op.gte]: minRating
                    }
                }
                : (maxRating
                    ? {
                        rating: {
                            [Op.lte]: maxRating
                        }
                    }
                    : {}))),

        // Búsqueda por stock
        ...((minStock && maxStock)
            ? {
                stock: {
                    [Op.between]: [minStock, maxStock]
                }
            }
            : (minStock
                ? {
                    stock: {
                        [Op.gte]: minStock
                    }
                }
                : (maxStock
                    ? {
                        stock: {
                            [Op.lte]: maxStock
                        }
                    }
                    : {})))

    };
    const products = await Products.findAndCountAll({
        where: searchCondition,
        limit: limit || PRODUCTS_PER_PAGE,
        offset,
        order: [
            // Ordenar por precio
            ...(sortBy === 'price' ? [['price', orderBy || 'ASC']] : []),
            // Ordenar por rating
            ...(sortBy === 'rating' ? [['rating', orderBy || 'ASC']] : []),
            // Ordenar por stock
            ...(sortBy === 'stock' ? [['stock', orderBy || 'ASC']] : []),
            // Ordenar por nombre
            ...(sortBy === 'name' ? [['name', orderBy || 'ASC']] : []),
            // En caso de no especificar un orden, ordenar por id
            ...((!sortBy || sortBy === 'idProduct')
                ? [['idProduct', orderBy || 'ASC']]
                : [['idProduct', 'ASC']])
        ]
    });

    // Consulta adicional para obtener la cantidad total de resultados
    const totalResults = products.count;

    // Calcular la cantidad total de páginas
    const totalPages = Math.ceil(totalResults / PRODUCTS_PER_PAGE);

    if (!products.rows?.length) {
        throw new Error('No se encontraron resultados. Prueba de otra manera.');
    }

    return {
        results: products,
        pages: totalPages
    };
};

module.exports = filterAndOrderProductsController;
