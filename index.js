const socket = io('https://whispering-meadow-87696.herokuapp.com/')
const nam = prompt("enter your name")

socket.on('connection')

socket.on('user-joined', data => {
    messages = document.getElementById("messages")
    div = document.createElement("div");
    div.classList.add("line1")
    div_inner = document.createElement("div");
    div_inner.classList.add("mid")
    div_inner.innerHTML = data + " has joined the party"
    div.appendChild(div_inner)
    messages.appendChild(div)
})

socket.on('receive', data => {
    messages = document.getElementById("messages")
    div = document.createElement("div");
    div.classList.add("line")
    div_inner = document.createElement("div");
    div_inner.classList.add("left")
    div_inner.innerHTML = `${data.name}: ${data.message}`
    div.appendChild(div_inner)
    messages.appendChild(div)
})

socket.on('user-disconnected', data => {
    messages = document.getElementById("messages")
    div = document.createElement("div");
    div.classList.add("line1")
    div_inner = document.createElement("div");
    div_inner.classList.add("mid-left")
    div_inner.innerHTML = data + " has left"
    div.appendChild(div_inner)
    messages.appendChild(div)
})

socket.emit('new-user-joined', nam)

const btn = document.getElementById('send_button')

btn.addEventListener('click', () => {
    typed_message = document.getElementById("typed_message").value
    div = document.createElement("div");
    div.classList.add("line")
    div_inner = document.createElement("div");
    div_inner.classList.add("right")
    div_inner.innerHTML = `${typed_message}`
    div.appendChild(div_inner)
    messages.appendChild(div)
    socket.emit('send', typed_message)
    document.getElementById("typed_message").value = ""
})