import { For } from 'classic-react-components'
import { RefObject, useState } from 'react'
import { BiSend } from 'react-icons/bi'

export default function MessageContainer({
   channel,
   msgs,
   handleSendMsg,
   msgContainerRef,
}: {
   channel?: string
   msgs: Array<{ msg: string; sender: string; current?: boolean }>
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
                     <div key={idx} className='flex px-4'>
                        <div
                           className={`msg-text bg-orange-100 px-3 py-1 rounded-lg ${data.current ? 'ml-auto bg-green-400' : 'mr-auto'}`}
                        >
                           <p>{data.msg}</p>
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
