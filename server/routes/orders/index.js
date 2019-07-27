import controller from './controller'

export default (app) => {
    app.get('/orders', controller.getAll)
    app.get('/order/:id', controller.get)
    app.post('/orders', controller.add)
}
