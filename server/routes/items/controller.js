// use mock db
import Validator from './validation'

import models from '../../models'

let itemNotFoundMessage = {
    success: false,
    message: "Item could not be found"
}
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

        itemModel.findByPk(id).then(item => {
            if (item) {
                return res.status(200).send({
                    success: true,
                    item
                })
            }

            return res.status(404).send(itemNotFoundMessage)
        })
    }

    static add(req, res) {
        const items = req.body.items
        Validator.validateAdd(items).then(() => {
            // TODO: FIX WITH PROMISE / ASYNC AWAIT
            let promises = items.map(item => {
                itemModel.create(item).then((createdItem) => {
                    return createdItem.id
                })
            })

        }).catch(() => {
            res.status(400).send({
                success: false,
                message: 'One (or more) items are invalid'
            })
        })
    }

    static modifyQuantity(req, res) {
        Validator.validateModifyQuantity(req.body).then(() => {
            const id = parseInt(req.params.id)
            const newStock = parseInt(req.body.stock)

            itemModel.findByPk(id).then(item => {
                if (item) {
                    item.update({
                        stock: newStock
                    }).then(() => {
                        return res.status(200).send({
                            success: true,
                            message: "Stock successfully updated"
                        })
                    })
                } else {
                    return res.status(404).send(itemNotFoundMessage)
                }
            })


        }).catch(() => {
            res.status(400).send({
                success: false,
                message: 'Invalid request'
            })
        })

    }

    static delete(req, res) {
        const id = parseInt(req.params.id)

        itemModel.findByPk(id).then(item => {
            if (item) {
                item.destroy().then(() => {
                    return res.status(200).send({
                        success: true
                    })
                })
            } else {
                return res.status(404).send(itemNotFoundMessage)
            }
        })

    }




}
