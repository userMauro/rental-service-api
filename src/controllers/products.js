const { v4: uuidv4 } = require('uuid')
const Product = require('../models/Product')

const createProduct = async (req, res, next) => {
    try {
        const { name, image, barcode, owner, location, addressee, state } = req.body

        const product = await Product.findOne({ where: { barcode } })
        if (product) return res.status(401).json({ status: false, msg: 'Ya existe un producto con el código de barras ingresado' })

        const newProduct = await Product.create({
            name,
            state,
            image,
            barcode,
            owner,
            location,
            addressee
        })

        return res.status(200).json({ status: true, msg: 'Producto creado exitosamente' });
    } catch (error) {
        return next(error)
    };
}

const scanProduct = async (req, res, next) => {
    try {
        const { barcode } = req.body

        const product = await Product.findOne({ where: { barcode } })
        if (!product) return res.status(401).json({ status: false, msg: 'No se encontró un producto con este código' })

        return res.status(200).json({ status: true, msg: product });
    } catch (error) {
        return next(error)
    };
}

const transferProduct = async (req, res, next) => {
    try {
        const { userId, productId, location, image, state, addressee } = req.body;

        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ status: true, msg: "Usuario/producto no encontrado" });
        }

        // agregar lógicas de state y location, con owner y adressee

        // Crea un nuevo registro de ScanHistory
        const scanHistory = await ScanHistory.create({
            scanDate: new Date(),
            location,
            image, // solucionar guardado de imágen en nube
            state,
        });

        await scanHistory.setUser(user);
        await scanHistory.setProduct(product);

        return res.status(200).json({ status: true, msg: "Transferencia exitosa" });
    } catch (error) {
        return next(error)
    }
}

const getProductHistory = async (req, res, next) => {
    try {
        const productId = req.params.productId; // Suponemos que productId se pasa como parámetro en la URL
    
        // Verifica si el producto existe en la base de datos
        const product = await Product.findByPk(productId);
    
        if (!product) {
            return res.status(404).json({ status: true, msg: "Producto no encontrado" });
        }
    
        const history = await ScanHistory.findAll({
            where: { ProductId: productId },    // Filtrar por productId
            include: [{ model: User }],         // Incluir información del usuario que escaneó
            order: [['scanDate', 'DESC']],      // Ordenar por fecha de escaneo descendente
        });
    
        return res.status(200).json({ status: true, msg: history });
    } catch (error) {
        return next(error)
    }
}

module.exports = { createProduct, scanProduct, transferProduct, getProductHistory };
