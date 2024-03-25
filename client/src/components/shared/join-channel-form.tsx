import { FormEvent, useState } from 'react'

export default function JoinChannelForm({
   handleChannelJoin,
}: {
   handleChannelJoin: ({ room, username }: { room: string; username: string }) => void
}) {
   const [room, setRoom] = useState('react')
   const [username, setUsername] = useState('Asis')
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleChannelJoin({ room, username })
   }

   return (
      <form
         onSubmit={handleSubmit}
         className='max-w-md mx-auto bg-purple-100 rounded-md shadow-lg h-72 flex flex-col gap-4 p-4 mt-20'
      >
         <h3 className='text-center text-2xl mb-4'>Join/Create Channel</h3>
         <input
            type='text'
            placeholder='username'
            className='px-2 focus:outline-1 focus:shadow-none py-1 rounded-md border-0'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <input
            type='text'
            placeholder='channel name'
            className='px-2 focus:outline-1 focus:shadow-none py-1 rounded-md border-0'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
         />
         <button className='bg-green-600 text-white px-4 py-2 rounded-md mt-auto'>join channel</button>
      </form>
   )
}
