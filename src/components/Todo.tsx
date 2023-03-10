import { TodoType } from '@/types/types'
import { useState } from 'react'

export default function Todo(props: any) {
  const [todoState, setTodoState] = useState<TodoType>(props.todo)

  return (
    <>
      <div className='grid grid-cols-2 grid-rows-2 bg-slate-100 mx-64 px-5 py-5 rounded-lg my-4 drop-shadow-md'>
          <div>
            <h3 className='text-lg font-bold'>{todoState.title}</h3>
          </div>

          <div className='flex justify-end'>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={event => props.handelDel(event, todoState.id)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer hover:fill-rose-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>

          <div className='mt-1 col-span-2'>
            <p className='text-sm'>{todoState.description}</p>
          </div>
      </div>
    </>
  )
}