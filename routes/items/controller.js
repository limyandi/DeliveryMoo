// use mock db
import items from '../../db/items'

import models from '../../models'
let itemModel = models.items

export default class ItemController {

    static getAll(req, res) {
        itemModel.findAll().then(items => {
            return res.status(200).send({
                success: true,
                items
            })
        })
    }

    static get(req, res) {
        const id = parseInt(req.params.id)

        itemModel.findByPk(id).then(todo => {
            if (todo) {
                return res.status(200).send({
                    success: true,
                    todo
                })
            }

            return res.status(404).send({
                success: false,
                message: "Item could not be found"
            })
        })
    }

    static add(req, res) {

    }

    static modifyQuantity(req, res) {

    }




}
