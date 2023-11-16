const User = require('../models/User')
const Product = require('../models/Product')
const ScanHistory = require('../models/ScanHistory')

const { PRODUCT_STATE_IN, PRODUCT_STATE_OUT } = require('../utils/constants')
const { uploadImage, getImage } = require('../config/s3')

const createProduct = async (req, res, next) => {
    try {
        const { name, barcode, location } = req.body

        const product = await Product.findOne({ where: { barcode } })
        if (product) {
            return res.status(400).json({ status: false, msg: 'Ya existe un producto con el código de barras ingresado' })
        } 

        if (!req.file?.buffer) {
            return res.status(404).json({ status: false, msg: 'Es necesario cargar una foto para crear un producto' })
        }

        const image = { 
            buffer: req.file?.buffer, 
            barcode, 
            mimetype: req.file?.mimetype 
        }

        const s3response = await uploadImage(image)

        if (!s3response?.$metadata.httpStatusCode === 200) {
            return res.status(400).json({ status: false, msg: 'Error al guardar la imágen' })
        }

        const newProduct = await Product.create({
            state: PRODUCT_STATE_IN,
            name,
            barcode,
            location,
        })

        return res.status(200).json({ status: true, msg: 'Producto creado exitosamente' });
    } catch (error) {
        return next(error)
    };
}

const scanProduct = async (req, res, next) => {
    try {
        const { barcode } = req.params

        const product = await Product.findOne({ where: { barcode } })

        if (!product) {
            return res.status(404).json({ status: false, msg: 'No se encontró un producto con este código' })
        }

        const imageUrl = await getImage(product?.barcode)

        if (!imageUrl) {
            return res.status(400).json({ status: false, msg: 'No se pudo obtener la imágen del producto' })
        }

        product.setDataValue("image", imageUrl);

        return res.status(200).json({ status: true, msg: product });
    } catch (error) {
        return next(error)
    };
}

const transferProduct = async (req, res, next) => {
    try {
        const { userId, productId, location, state, addressee, barcode } = req.body;

        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ status: true, msg: "Usuario o producto no encontrado" });
        }

        if (!req.file?.buffer) {
            return res.status(404).json({ status: false, msg: 'Es necesario cargar una foto para crear un producto' })
        }

        const productUpdates = {
            location,
            state,
            owner: state !== PRODUCT_STATE_OUT ? user.name : addressee,
        };

        const image = { 
            buffer: req.file?.buffer, 
            barcode, 
            mimetype: req.file?.mimetype 
        }

        const s3response = await uploadImage(image)

        if (!s3response?.$metadata.httpStatusCode === 200) {
            return res.status(400).json({ status: false, msg: 'Error al guardar la imágen' })
        }

        await product.update(productUpdates);

        const scanHistoryData = {
            scanDate: new Date(),
            scanOwner: user.name,
            addressee: state === PRODUCT_STATE_OUT ? addressee : null,
            ...productUpdates
        };
        
        const scanHistory = await ScanHistory.create(scanHistoryData);

        await scanHistory.setUser(user);
        await scanHistory.setProduct(product);

        return res.status(200).json({ status: true, msg: "Transferencia exitosa" });
    } catch (error) {
        return next(error)
    }
}

const getProductHistory = async (req, res, next) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findByPk(productId);
    
        if (!product) {
            return res.status(404).json({ status: true, msg: "Producto no encontrado" });
        }
    
        const history = await ScanHistory.findAll({
            where: { ProductId: productId },
            include: [{ 
                model: User,
                attributes: ['username', 'name'],
            }],
            order: [['scanDate', 'DESC']],      // Ordenar por fecha de escaneo descendente
        });
    
        return res.status(200).json({ status: true, msg: history });
    } catch (error) {
        return next(error)
    }
}

const getProducts = async (req, res, next) => {
    try {
        const location = req.params?.location;
    
        const queryOptions = location ? { where: { location } } : {};
    
        const products = await Product.findAll(queryOptions);
    
        return res.status(200).json({ status: true, msg: products });
    } catch (error) {
        return next(error);
    }
};

module.exports = { createProduct, scanProduct, transferProduct, getProductHistory, getProducts };
