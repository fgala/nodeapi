'use strict'

var Product = require('../models/product')
var app = require('../app')

function getProducts(req, res){
	Product.find({}, (err,products) => {
		if(err) res.status(500).send({message:`Error al realizar la petición: ${err}`})		
		if(!products) res.status(404).send({message: "No existen productos"})
		
		res.status(200)
		res.send({ products })
	});
}

function getProduct(req, res){
	let productId = req.params.productId
	Product.findById(productId, (err, product) => {
		if(err) res.status(500).send({message:`Error al realizar la petición: ${err}`})
		console.log(`Mostrando el producto con ID: ${productId}`)
		if(!product) res.status(404).send({message: "El producto no existe"})
		
		res.status(200)
		res.send({ product })
	})
}

function deleteProduct(req, res){
	let productId = req.params.productId
	Product.findById(productId, (err, product) => {
		if(err) res.status(500).send({message:`Error al eliminar el producto: ${err}`})
		
		product.remove(err =>{
			if(err) res.status(500).send({message:`Error al eliminar el producto: ${err}`})
			
			res.status(200).send({message: `El producto con id ${productId} has sido eliminado.`})
		})
	})
}

function updateProduct(req, res){
	let productId = req.params.productId
	let update = req.body
	console.log(update)
	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if(err) res.status(500).send({message:`Error al actualizar el producto: ${err}`})

		res.status(200).send({product: productUpdated, message: `El producto con id ${productId} ha sido actualizado!`})
	})
}

function saveProduct(req, res){
	console.log('POST /api/product')
	console.log(req.body)

	let product = new Product()
	product.name = req.body.name
	console.log(product.name)
	product.picture = req.body.picture
	console.log(product.picture)
	product.price = req.body.price
	console.log(product.price)
	product.category = req.body.category
	console.log(product.category)
	product.description = req.body.description
	console.log(product.description)

	product.save((err, productStored) => {
		if(err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})

		res.status(200).send({product: productStored})
	});
}

module.exports = {
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
	saveProduct
}