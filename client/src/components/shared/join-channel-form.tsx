import { FormEvent, useState } from 'react'

export default function JoinChannelForm({
   handleChannelJoin,
}: {
   handleChannelJoin: ({ room }: { room: string }) => void
}) {
   const [room, setRoom] = useState('god')
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleChannelJoin({ room })
   }

   return (
      <form
         onSubmit={handleSubmit}
         className='max-w-72 mx-auto bg-purple-100 rounded-lg h-72 flex flex-col gap-4 p-4 mt-20'
      >
         <h3 className='text-center text-2xl'>Join/Create Channel</h3>
         <input
            type='text'
            placeholder='enter channel name'
            className='border px-2 focus:outline-1 focus:shadow-none'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
         />
         <button className='bg-purple-600 px-4 py-2 rounded-md mt-auto'>join channel</button>
      </form>
   )
}
