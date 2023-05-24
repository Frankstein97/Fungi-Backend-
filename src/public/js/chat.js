let socket = io()
let user = ''
let chatBox = document.getElementById('chatbox')
// esta parte se hace con socket para que funcionen las cosas on demand 

// Autenticación

Swal.fire({
    title: 'Hola! aqui podras dejar un mensaje',
    input: 'text',
    text: 'Ingrese un nombre de usuario',
    inputValidator: value => {
        return !value.trim() && 'Porfavor ingrese un nombre valido'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value
    document.getElementById('username').innerHTML = user
    socket = io()
})

// Enviar Mensajes
chatBox.addEventListener('keyup', event => {
    if(event.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user,
                message: chatBox.value
            })
            
            chatBox.value = ''
        }
    }
})

// Recibidor de  mensajes
socket.on('logs', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''

    data.reverse().forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });

    divLog.innerHTML = messages
})