const express = require('express')
const cors  = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connection Code 
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })

const connection = mongoose.connection

connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

const drugsRouter = require('./routes/drugs')
const brandsRouter = require('./routes/brands')

app.use('/drugs', drugsRouter)
app.use('/brands', brandsRouter)

// Starts Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})