// console.log('Chat Program Start');

// import express module
const express = require('express')

// import socket.id module
const socket = require('socket.io')

// import Node.js module
// const http = require('http')

// import fs module
const fs = require('fs')

// create express object
const app = express()

// create express http server
const server = http.createServer(app)

// binding server to socket.io
const io = socket(server);

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

// listen server to 8080 port
server.listen(8000, function() {
	console.log('서버 실행 중  .... new')
})
