import controller from './controller'

export default (app) => {
    app.get('/items', controller.getAll)
    app.get('/item/:id', controller.get)
    app.post('/items', controller.add)
    app.patch('/items/:id', controller.modifyQuantity)
}
