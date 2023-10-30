const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('products', {
        idProduct: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true //de momento para facilitar pruebas
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true //de momento para facilitar pruebas
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true //de momento para facilitar pruebas
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true //de momento para facilitar pruebas
        },
        patent: {
            type: DataTypes.STRING,
            allowNull: true //de momento para facilitar pruebas
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true //de momento para facilitar pruebas
        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true //de momento para facilitar pruebas
        },
        package: {
            type: DataTypes.STRING,
            allowNull: true //de momento para facilitar pruebas
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true //de momento para facilitar pruebas
        },
        promotion: {
            type: DataTypes.INTEGER, //podria ser un valor como descuento
            allowNull: true //de momento para facilitar pruebas
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true //de momento para facilitar pruebas
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 1000]
            }
        },
        nroReviews: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        }
    },
        { timestamps: true });
};
