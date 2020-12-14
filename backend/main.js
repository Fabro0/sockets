const express = require("express")
const port = process.env.PORT || 8080
const app = express()

require("dotenv").config()

const http = require("http").createServer(app)

const io = require("socket.io")(http, {
    cors:{origin:"*"}
});

app.get("/", (req,res) =>{
    res.json({hola:"hola"})
})

io.on("connection", (socket) =>{
    let id = socket.handshake.query.room;
    socket.join(id)
    socket.to(id).emit("nuevo",`entro ${socket.id}`)
    
    console.log("hola")
    socket.on("message", msg =>{
        console.log(msg)
        socket.to(id).emit("advertencia",`${socket.id}: ${msg}`)
    })
    socket.on("leave", msg =>{
        console.log("chau")
        socket.to(id).emit("nuevo",`se fue ${socket.id}`)
        socket.leave(id)
    })
})


http.listen(port, () => console.log("http srv"))