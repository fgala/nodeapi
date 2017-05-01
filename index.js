const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
	console.log('Conectado a MongoDB!')
	app.listen(config.port, () => {
		console.log(`Funcionando en puerto: ${config.port}`)
	})
})