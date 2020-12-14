
// const endpoint = "localhost:8080"
var endpoint = "socketio-test-pollo.herokuapp.com"

var socket;
var connected = false;


let btn_send = document.getElementById("button-text");
let btn_leave = document.getElementById("button-leave");

let text = document.querySelector("input")
let room = document.getElementById("room")
let btn_connect = document.getElementById("button-connect");

btn_send.onclick = () => {
    //a
    let lista_mensajes = document.getElementById("ul-mensajes");
    let e = document.createElement("li");
    e.innerText = "vos: "+text.value;
    e.classList += "local"
    lista_mensajes.appendChild(e)
    socket.emit("message", text.value)
    text.value = ""
}
btn_leave.onclick = () => {
    socket.emit("leave")

    text.style.display = "none"
    btn_send.style.display = "none";
    btn_leave.style.display = "none";
    btn_leave.style.display = "none";

    room.style.display = "inline"
    btn_connect.style.display = "inline";
}

// document.querySelector("html").onmousemove = (e) =>{
//     e.clientX % 40 === 0 && console.log(e)
// }

btn_connect.onclick = () => {
    socket = io(`wss://${endpoint}`, { transports: ['websocket'],query: `name=${room.value}`, reconnect: false },)
    text.style.display = "inline"
    btn_send.style.display = "inline";
    btn_leave.style.display = "inline";
    btn_leave.style.display = "inline";
    room.style.display = "none"
    btn_connect.style.display = "none";



    socket.on("advertencia", text => {
        console.log(text);

        let lista_mensajes = document.getElementById("ul-mensajes");
        let e = document.createElement("li");
        e.innerText = text;
        e.classList += "external"
        lista_mensajes.appendChild(e)

    })
    socket.on("nuevo", text => {
        console.log(text)
        let lista_mensajes = document.getElementById("ul-mensajes");
        let e = document.createElement("li");
        e.innerText = text;
        e.classList += "joined"
        lista_mensajes.appendChild(e)
    })
}
