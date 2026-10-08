const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not_found')
const errorHandlerMiddlware = require('./middleware/error_handler')

//middleware
app.use(express.json())
app.use(express.static('./public'))

const port = process.env.PORT || 3000


//routes
app.use('/api/v1/tasks', tasks)

app.get('/', (req, res) =>{
    res.status(200).send('Hello World')
})

app.use(notFound)
app.use(errorHandlerMiddlware)




const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>{
            console.log(`server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
