import { For } from 'classic-react-components'
import { RefObject, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { Msg } from 'src/App'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

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
      <div className='msg-container bg-blue-100 py-4 fixed inset-0 overflow-hidden'>
         <div className='msgs h-[calc(100%-40px)] flex flex-col gap-4 overflow-scroll' ref={msgContainerRef}>
            <For data={msgs}>
               {(data, idx) => {
                  return (
                     <div className='chat-msg'>
                        <p className='date mb-2 text-center'>{dayjs(new Date(data.timestamp)).fromNow()}</p>
                        <div key={idx} className={`flex px-4 gap-2 ${data.current ? 'flex-row' : 'flex-row-reverse'}`}>
                           <div
                              className={`msg-text bg-orange-100 px-3 py-1 rounded-lg ${data.current ? 'ml-auto' : 'mr-auto'}`}
                           >
                              <p>{data.msg}</p>
                           </div>
                           <div
                              className={'avatar-box h-8 w-8 rounded-full flex items-center justify-center'}
                              style={{ backgroundColor: data.AvatarClr }}
                           >
                              {data.sender[0]}
                           </div>
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
