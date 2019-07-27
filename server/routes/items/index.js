import controller from './controller'
import {
    isAdmin
} from '../auth'

export default (app) => {
    app.get('/items', controller.getAll)
    app.get('/item/:id', controller.get)
    // admin utility.
    app.post('/items', isAdmin, controller.add)
    app.patch('/items/:id', isAdmin, controller.modifyQuantity)
    app.delete('/item/:id', isAdmin, controller.delete)
}
