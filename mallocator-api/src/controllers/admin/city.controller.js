const Joi = require("joi");
const { handleControllerError } = require("../../../utils/helpers");
const State = require("../../models/state.model");
const { default: mongoose } = require("mongoose");
const City = require("../../models/city.model");

const cityCtrl = {
    createCity,
    getCitiesByState
}

const createCitySchema = Joi.object({
    name: Joi.string().required(),
})

module.exports = cityCtrl;

async function createCity(req) {
    try {
        const { error } = createCitySchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }

        const { stateId } = req.params;

        if (!mongoose.isValidObjectId(stateId)) {
            throw Error('Invaid state id')
        }

        const existingCity = await City.findOne({
            name: req.body.name,
            state: stateId
        })

        console.log(existingCity);

        if (existingCity) {
            throw Error("City already exists")
        }

        const city = new City({
            name: req.body.name,
            state: stateId
        })

        await city.save();

        return city;
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getCitiesByState(req) {
    try {
        const { stateId } = req.params
        if (!mongoose.isValidObjectId(stateId)) {
            throw Error("invalid state id")
        }

        const cities = await City.find({ state: stateId })

        if (!cities) {
            throw Error("No cities found for state")
        }

        return cities
    } catch (e) {
        throw handleControllerError(e)
    }
}

