const { v4: uuidv4 } = require('uuid')
const Product = require('../models/Product')

const createProduct = async (req, res, next) => {
    try {
        const { name, image, barcode, currentOwner, location } = req.body
        // const { name, state, lastOwner, image, record, barcode } = req.body

        const exists = await Product.findOne({ where: { barcode } })
        if (exists) return res.status(401).json({ status: false, msg: 'Ya existe un producto con el código de barras ingresado' })

        const newProduct = await Product.create({
            name,
            image,
            barcode,
            currentOwner,
            location,
        })

        return res.status(200).json({ status: true, msg: 'Producto creado exitosamente' });
    } catch (error) {
        return next(error)
    };
}

// const transferProduct = async (req, res, next) => {
//     try {
//         const { barcode, newOwner, newLocation } = req.body;

//         // Verificar si el producto existe
//         const product = await Product.findOne({ where: { barcode } });
//         if (!product) {
//             return res.status(404).json({ status: false, msg: 'Producto no encontrado' });
//         }

//         // Actualizar el propietario actual del producto
//         product.currentOwner = newOwner;
//         await product.save();

//         // Registrar la transferencia de propiedad en ProductOwnership
//         await ProductOwnership.create({
//             productId: product.id,
//             previousOwner: product.currentOwner,
//             newOwner,
//             transferDate: new Date(),
//         });

//         // Registrar el cambio de ubicación en ProductHistory
//         await ProductHistory.create({
//             productId: product.id,
//             previousLocation: product.location,
//             newLocation,
//             changeDate: new Date(),
//         });

//         return res.status(200).json({ status: true, msg: 'Producto escaneado y transferido exitosamente' });
//     } catch (error) {
//         return next(error);
//     }
// };

// const checkCurrentOwner = async (req, res, next) => {
//     try {
//         const { barcode } = req.params;

//         // Buscar el producto por su código de barras
//         const product = await Product.findOne({ where: { barcode } });

//         if (!product) {
//             return res.status(404).json({ status: false, msg: 'Producto no encontrado' });
//         }

//         const currentOwner = product.currentOwner;

//         return res.status(200).json({ status: true, currentOwner });
//     } catch (error) {
//         return next(error);
//     }
// };

// const getProductHistory = async (req, res, next) => {
//     try {
//         const { barcode } = req.params;

//         // Buscar el producto por su código de barras
//         const product = await Product.findOne({ where: { barcode } });

//         if (!product) {
//             return res.status(404).json({ status: false, msg: 'Producto no encontrado' });
//         }

//         // Buscar todos los registros de historial para este producto
//         const history = await ProductHistory.findAll({ where: { productId: product.id } });

//         return res.status(200).json({ status: true, history });
//     } catch (error) {
//         return next(error);
//     }
// };


module.exports = { createProduct };
