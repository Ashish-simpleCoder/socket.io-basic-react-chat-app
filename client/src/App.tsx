import { useEffect, useRef, useState } from 'react'
import { If } from 'classic-react-components'
import { io } from 'socket.io-client'
import { toast } from 'sonner'

import JoinChannelForm from './components/shared/join-channel-form'

export default function App() {
   const socket = useRef(io('http://localhost:3000'))
   const [isJoined, setIsJoined] = useState(false)

   const handleSubmit = ({ room }: { room: string }) => {
      socket.current.emit('join_room', { room })
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
      return () => {
         socket.current.disconnect()
         setIsJoined(false)
      }
   }, [])

   return (
      <div>
         <If condition={!isJoined}>
            <JoinChannelForm handleChannelJoin={handleSubmit} />
         </If>
      </div>
   )
}
