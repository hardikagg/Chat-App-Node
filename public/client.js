const socket = io()
let nam;
let text = document.querySelector('#textarea')
let msgArea = document.querySelector('.message')
do {
    nam = prompt('Please enter your name: ')
} while(!nam)


text.addEventListener('keyup', (e) => {
    if(e.key==='Enter') {
        sendMessage(e.target.value);
    }
})


function sendMessage(message) {
    
    let msg = {
        user: nam,
        message: message.trim()
    }
    if(msg.message)
    {
        appendMessage(msg, 'outgoing');
        text.value='';
        scrollToBottom();
        socket.emit('message', msg);
    }
    

}
let active="";
function appendMessage(msg, type) {
    let mainDiv=document.createElement('div');
    let className=type;
    mainDiv.classList.add(className, 'messageAdd');
    let markup = `<h4>${msg.user}</h4> <p>${msg.message}</p>`;
    if(type==='outgoing'||(type==='incoming'&&active===msg.user))
    {
        mainDiv.innerHTML=`<p>${msg.message}</p>`;
    }
    else
    {
        mainDiv.innerHTML=markup;
        mainDiv.classList.add(className, 'moreMargin');
    }
    
    msgArea.appendChild(mainDiv);
    active=msg.user;
}
 
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    msgArea.scrollTop=msgArea.scrollHeight;
}
