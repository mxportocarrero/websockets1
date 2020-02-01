const socket = io()

// DOM elements
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

// Listeners
btn.addEventListener('click', () => {
  socket.emit('chat message', {
    username: username.value,
    message: message.value
  })
})

message.addEventListener('keypress', () => {
  socket.emit('chat typing', username.value)
})

socket.on('server message', data => {
  actions.innerHTML = '';
  output.innerHTML += `<p>
    <strong>${data.username}: ${data.message}</strong>
  </p>`
})

socket.on('chat typing', data => {
  actions.innerHTML = `<p>
  <em>${data} esta escribiendo</em>
</p>`
})