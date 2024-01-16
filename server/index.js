require('dotenv').config()
const sequelize = require('./db')
const express = require("express")
const path = require('path')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/static', express.static('static'))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()