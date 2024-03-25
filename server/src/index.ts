import express from 'express'
import { createServer } from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

const port = 3000
const app = express()


app.use(cors({
   origin:"http://localhost:8080",
   methods:["GET","POST"],
   credentials: true
}))


const server = createServer(app)
const io = new Server(server,{
   cors:{
      origin:"http://localhost:8080",
      methods:["GET","POST"],
      credentials: true
   }
})






app.get("/",(req,res)=>{
   res.send("socket io")
})

io.on("connection",(socket)=>{
   // console.log('user connected', socket.id)
   socket.emit("welcome", "Welcome to server "+ socket.id)
   // socket.broadcast.emit("welcome", "Welcome to server "+ socket.id)
   // socket.to("")

   socket.on("disconnect",()=>{
      console.log("socket disconnect")
   })

   socket.on("join_room",(data:{room: string, username: string, AvatarClr?: string})=>{
      socket.join(data.room)
      socket.emit("join_successful",data.room + " Channel joined successfully")
      socket.on("send_msg",(msg)=>{
         socket.broadcast.emit("recieve_msg",{msg, sender: data.username, AvatarClr:data.AvatarClr})
      })


   })
})
server.listen(port,() =>{
   console.log('server is running on port 3000')
})