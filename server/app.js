import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'
import helmet from 'helmet'

const app = express()

// prevent attackers from using common attacks like cross-site-scripting, clickjacking and other malicious attacks.
app.use(helmet())
// parse incoming requests data (global).
// example of middleware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

//use personal router
app.use(router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

export default app
