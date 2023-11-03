const { v4: uuidv4 } = require('uuid')
const Location = require('../models/Location')

const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.findAll({
            attributes: ['id', 'name']
        });

        if (locations) {
            return res.status(200).json({ status: true, msg: locations });
        } else {
            return res.status(404).json({ status: false, msg: 'No se encontraron locaciones' });
        }
    } catch (error) {
        return next(error)
    };
}

const createLocation = async (req, res, next) => {
    try {
        const { name } = req.body

        const location = await Location.findOne({ where: { name } })

        if (location) {
            return res.status(400).json({ status: false, msg: 'Ya existe una locación con ese nombre' })
        } 

        await Location.create({ name })

        return res.status(200).json({ status: true, msg: 'Locación creada exitosamente' });
    } catch (error) {
        return next(error)
    };
}

const deleteLocation = async (req, res, next) => {
    try {
        const { id } = req.params;

        const location = await Location.findByPk(id);

        if (!location) {
            return res.status(404).json({ status: false, msg: 'La locación no existe' });
        }

        await location.destroy();

        return res.status(200).json({ status: true, msg: 'Locación eliminada exitosamente' });
    } catch (error) {
        return next(error);
    }
};

const modifyLocation = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const { name } = req.body; 

        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({ status: false, msg: 'La locación no existe' });
        }

        location.name = name;
        await location.save();

        return res.status(200).json({ status: true, msg: 'Nombre de la locación modificado exitosamente' });
    } catch (error) {
        return next(error);
    }
};

module.exports = { getLocations, createLocation, deleteLocation, modifyLocation };
