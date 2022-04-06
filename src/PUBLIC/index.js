let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;
/* alerta de identificacion */
Swal.fire({
    title: "Identificate",
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && '¡You need write a name!'
    }
}).then(result => {
    user = result.value;
})

chatBox.addEventListener('keyup', evt => {
        if (evt.key === "Enter") {
            if (chatBox.value.trim().length > 0) {
                socket.emit('message', { user, message: chatBox.value.trim() })
                chatBox.value = "";
            }
        }
    })
    /* SOCKET(eventos) */

socket.on('log', data => {
    let messages = "";
    data.forEach(log => {
        messages = messages + `${log.user} dice : ${log.message}</br>`
    })
    log.innerHTML = messages;
})



/* ver lo del spam min 56:42 para la derecha*/