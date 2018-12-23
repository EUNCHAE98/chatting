// console.log('Chat Program Start');

// import express module
const express = require('express')

// import socket.id module
const socket = require('socket.io')

// import Node.js module
const http = require('http')

// import fs module
const fs = require('fs')

// create express object
const app = express()

// create express http server
const server = http.createServer(app)


// binding server to socket.io
const io = socket(server)

// use Middleware for static
app.use('/css',express.static('./static/css'))
app.use('/js',express.static('./static/js'))


// get server
app.get('/',function(request,response) {
	fs.readFile('./static/index.html', function(err, data) {
		if(err){
			response.send('에러')
		} else {
			response.writeHead(200, {'Content-Type':'text/html'})
			response.write(data)
			response.end()
		}
	})
})

io.sockets.on('connection', function(socket) {

	//if new user connects, alert other users
	socket.on('newUser', function(name) {
		console.log(name + ' 님이 접속하였습니다')

		// store name into socket
		socket.name = name

		// send all socket
		io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + ' 님이 접속하였습니다'})
	}) 

	//get message
	socket.on('message', function(data) {
		// add name to message data
		data.name = socket.name

		console.log(data)

		// send message to all user without sender
		socket.broadcast.emit('update', data)
	})

	// exit access
	socket.on('disconnect', function() {
		console.log(socket.name + ' 님이 나가셨습니다')

		// send message to all user without exit user
		socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + ' 님이 나가셨습니다'})
	})
})

// listen server to 8080 port
server.listen(8000, function() {
	console.log('서버 실행 중  .... new')
})
