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

socket.on('update', function(data) {
	console.log('${data.name} : ${data.message}')
})

// send message
function send() {
	// call input data
	var message = document.getElementById('test').value

	// make input blank
	document.getElementById('test').value = ''

	// send event to server with data
	socket.emit('message', {type: 'message', message: message})  
}
