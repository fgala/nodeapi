'use strict'

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const ProductsCtrl = require('./controllers/product')

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.get('/api/product', ProductsCtrl.getProducts)
app.get('/api/product/:productId', ProductsCtrl.getProduct)
app.delete('/api/product/:productId', ProductsCtrl.deleteProduct)
app.put('/api/product/:productId', ProductsCtrl.updateProduct)
app.post('/api/product', ProductsCtrl.saveProduct)

module.exports = app