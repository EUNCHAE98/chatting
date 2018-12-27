var socket = io()

// execute if connect
socket.on('connect', function() {
	// input name
	var name = prompt('반갑습니다 ! ', '')

	// if name is blank
	if(!name) {
		name = '익명'
	}

	// alert new user to server
	socket.emit('newUser', name)
})

// get data from server
socket.on('update', function(data) {
	// console.log('${data.name} : ${data.message}')
	var chat = document.getElementById('chat')

	var message = document.createElement('div')
	var node = document.createTextNode(`${data.name}: ${data.message}`)
	var className = ''


	// set class by type
	switch(data.type) {
		case 'message':
			className = 'other'
			break
		case 'connect':
			className = 'connect'
			break
		case 'disconnect':
			className = 'disconnect'
			break
	}

	message.classList.add(className)
	message.appendChild(node)
	chat.appendChild(message)
})

// send message
function send() {
	// call input data
	var message = document.getElementById('test').value

	// make input blank
	document.getElementById('test').value = ''

	// show message to clients
	var chat = document.getElementById('chat')
	var msg = document.createElement('div')
	var node = document.createTextNode(message)
	msg.classList.add('me')
	msg.appendChild(node)
	chat.appendChild(msg)

	// send event to server with data
	socket.emit('message', {type: 'message', message: message})  
}
