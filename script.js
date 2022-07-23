const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

const name = prompt('what is your name?')
appendMessage('You Joined')

socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    if (messageInput.value != '') {
        const message = messageInput.value
        socket.emit('send-chat-message', message)
        appendMessage(`You: ${message}`)
        messageInput.value = ''
    }
})

function appendMessage(message) {
    const messageEl = document.createElement('div')
    messageEl.classList.add('message')
    messageEl.innerText = message
    messageContainer.append(messageEl)
}