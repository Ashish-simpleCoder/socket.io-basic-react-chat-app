import { ElementRef, useEffect, useRef, useState } from 'react'
import { If, Else } from 'classic-react-components'
import { io } from 'socket.io-client'
import { toast } from 'sonner'

import JoinChannelForm from './components/shared/join-channel-form'
import MessageContainer from './components/shared/message-container'
import { flushSync } from 'react-dom'

export default function App() {
   const socket = useRef(io('http://localhost:3000'))
   const [isJoined, setIsJoined] = useState(false)
   const [msgs, setMsgs] = useState<Array<{ msg: string; sender: string; current?: boolean }>>([])
   const msgContainerRef = useRef<ElementRef<'div'>>(null)

   const handleSubmit = ({ room, username }: { room: string; username: string }) => {
      socket.current.emit('join_room', { room, username })
   }
   const handleSendMsg = (msg: string) => {
      socket.current.emit('send_msg', msg)
      flushSync(() => {
         setMsgs((old_msgs) => {
            old_msgs.push({ msg, sender: 'temp username', current: true })
            return [...old_msgs]
         })
      })
      msgContainerRef.current?.scrollTo(0, msgContainerRef.current.scrollHeight)
   }

   useEffect(() => {
      // socket.current.on('connect', () => {
      //    console.log('connected', socket.current.id)
      // })

      // socket.current.on('welcome', (msg) => {
      //    console.log({ msg })
      // })
      socket.current.on('join_successful', (msg) => {
         toast.success(msg)
         setIsJoined(true)
      })
      socket.current.on('recieve_msg', (data) => {
         flushSync(() => {
            setMsgs((old_msgs) => {
               old_msgs.push(data)
               return [...old_msgs]
            })
         })
         msgContainerRef.current?.scrollTo(0, msgContainerRef.current.scrollHeight)
      })
      return () => {
         socket.current.disconnect()
         setIsJoined(false)
      }
   }, [])

   return (
      <div>
         <If condition={!isJoined}>
            <JoinChannelForm handleChannelJoin={handleSubmit} />
            <Else>
               <MessageContainer msgs={msgs} handleSendMsg={handleSendMsg} msgContainerRef={msgContainerRef} />
            </Else>
         </If>
      </div>
   )
}
