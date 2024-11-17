const Joi = require("joi");
const { handleControllerError } = require("../../../utils/helpers");
const State = require("../../models/state.model");

const stateCtrl = {
    createState,
    getStates
}

const createStateSchema = Joi.object({
    name: Joi.string().required(),

})

module.exports = stateCtrl;

async function createState(req) {
    try {
        const { error } = createStateSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }

        const existingStateName = await State.findOne({
            name: req.body.name
        })

        if (existingStateName) {
            throw Error("State already exists")
        }

        const state = new State(req.body)

        await state.save();

        return state;
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getStates(req) {
    try {
        const state = await State.find()
        return state;
    } catch (e) {
        throw handleControllerError(e)
    }
}

