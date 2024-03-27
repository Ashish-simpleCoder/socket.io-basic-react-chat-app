import type { ReactNode, RefObject } from 'react'
import { For } from 'classic-react-components'
import { useMemo, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

import { Msg } from 'src/App'

dayjs.extend(relativeTime)

export default function MessageContainer({
   msgs,
   handleSendMsg,
   msgContainerRef,
}: {
   channel?: string
   msgs: Array<Msg>
   handleSendMsg: (msg: string) => void
   msgContainerRef: RefObject<HTMLDivElement>
}) {
   const [msg, setMsg] = useState('')
   return (
      <div className='msg-container bg-blue-100 bg-gradient-to-tr py-4 fixed inset-0 overflow-hidden'>
         <div className='msgs h-[calc(100%-40px)] flex flex-col overflow-y-scroll' ref={msgContainerRef}>
            <For data={msgs}>
               {(data) => {
                  return (
                     <div key={data.timestamp} className='chat-msg px-4 py-3'>
                        <div className={`flex gap-2 items-center ${data.current ? 'flex-row' : 'flex-row-reverse'}`}>
                           <MessageText current={!!data.current} msg={data.msg}>
                              <MessageTimeStamp
                                 timestamp={data.timestamp}
                                 className={data.current ? 'text-end' : 'text-start'}
                              />
                           </MessageText>
                           <Avatar clr={data.AvatarClr} name={data.sender} />
                        </div>
                     </div>
                  )
               }}
            </For>
         </div>
         <form
            onSubmit={(e) => {
               e.preventDefault()
               handleSendMsg(msg)
               setMsg('')
            }}
            className='msg-input-container flex gap-2 absolute bottom-0 bg-white w-full px-4 py-4 rounded-t-xl'
         >
            <input
               type='text'
               value={msg}
               onChange={(e) => setMsg(e.target.value)}
               placeholder='enter message'
               className='flex-1 border focus:outline-1 px-2'
            />
            <button>
               <BiSend />
            </button>
         </form>
      </div>
   )
}

function MessageTimeStamp({ timestamp, className = '' }: { timestamp: number; className?: string }) {
   let isMorning = true

   const hours = useMemo(() => {
      let res: string | number = new Date(timestamp).getHours()
      if (res > 11) {
         isMorning = false
      }
      if (res <= 9) {
         res = '0' + res
      }
      return res
   }, [timestamp])

   const mins = useMemo(() => {
      let res: string | number = new Date(timestamp).getMinutes()
      if (res <= 9) {
         res = '0' + res
      }
      return res
   }, [timestamp])

   return (
      <p className={`text-[10px] opacity-70 ${className}`}>
         {hours}: {mins} {isMorning ? 'AM' : 'PM'}
      </p>
   )
}
function Avatar({ clr, name }: { clr: string; name: string }) {
   return (
      <div
         className={'avatar-box h-8 w-8 rounded-full flex items-center justify-center'}
         style={{ backgroundColor: clr }}
      >
         {name[0]}
      </div>
   )
}
function MessageText({ msg, current, children }: { msg: string; current: boolean; children?: ReactNode }) {
   return (
      <div className={`msg-text ${current ? 'ml-auto' : 'mr-auto'}`}>
         {children}
         <p className='bg-white text-gray-950 px-3 py-1 rounded-lg tracking-wide'>{msg}</p>
      </div>
   )
}
