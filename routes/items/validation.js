import Joi from 'joi'

export default class Validation {
    static validateAdd(request) {
        const item = Joi.object({
            type: Joi.string().required(),
            color: Joi.string().required(),
            size: Joi.string().valid('S', 'M', 'L').required(),
            stock: Joi.number().required()
        })

        const items = Joi.array().items(item)

        return Joi.validate(request, items)
    }

    static validateModifyQuantity(request) {
        const schema = Joi.object({
            stock: Joi.number().required()
        })

        return Joi.validate(request, schema)
    }
}
