import models from '../../models'

const orderModel = models.orders
//item model needs to be used to check the current item stock.
const itemModel = models.items

export default class OrderController {
    static getAll(req, res) {
        orderModel.findAll().then(orders => {
            return res.status(200).send({
                success: true,
                orders
            })
        })
    }

    static get(req, res) {
        const id = parseInt(req.params.id)

        orderModel.findByPk(id).then(order => {
            if (order) {
                return res.status(200).send({
                    success: true,
                    order
                })
            }

            return res.status(404).send({
                success: false,
                message: "Order could not be found"
            })


        })
    }

    static add(req, res) {
        const requestBody = req.body
        // TODO: need better handler, too many error. USE JOI?
        if (!requestBody || !requestBody.itemId || !requestBody.quantity) {
            res.status(400).send({
                success: false,
                message: 'Invalid request'
            })
        }

        const itemId = parseInt(requestBody.itemId)
        const quantity = parseInt(requestBody.quantity)

        itemModel.findByPk(itemId).then(item => {
            if (item) {
                if (item.stock >= quantity) {
                    // TODO: Reduce Item Stock?
                    const order = {
                        itemId,
                        quantity
                    }
                    orderModel.create(order).then((order) => {
                        res.status(201).send({
                            success: true,
                            order
                        })
                    })
                } else {
                    //request not acceptable.
                    res.status(406).send({
                        success: false,
                        message: "Item does not have enough stock"
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: "Item could not be found"
                })
            }
        })
    }
}
