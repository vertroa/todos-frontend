import { TodoType } from '@/types/types'
import { useState } from 'react'


export default function Todo(props: any) {
  // The todo state is used to store the todo's data
  const [todo, setTodo] = useState<TodoType>(props.todo)

  // The isEditing state is used to toggle the todo's input fields
  const [isEditing, setIsEditing] = useState<boolean>(false)

  // Updates the todo state when the user edits any of the todo's fields
  function handleEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Saves the todo to the backend API when the user clicks out of the input field
  async function saveTodo(e: React.FocusEvent<HTMLHeadingElement>) {
    e.preventDefault()

    if (todo.title === '') {
      setTodo(prev => ({
        ...prev,
        title: 'Untitled Todo'
      }))
    }
  
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todo.title, description: todo.description, completed: false })
    };

    await fetch(`http://localhost:8080/todos/${todo.id}`, requestOptions)

    setIsEditing(false)
  }

  function handleKeyPress
  (e: React.KeyboardEvent<HTMLInputElement>) {
    console.log('test')
    if (e.key=== 'Enter') {
      blur()
    }
  }

  return (
    <>
      <div className='grid grid-cols-auto grid-cols-3 grid-rows-2 mx-64 px-3 py-3 bg-slate-100 rounded-lg my-4 drop-shadow-md'>
          <div className='col-span-2 text-lg font-bold pb-2'>
            {isEditing ?
              <input 
                type="text" 
                name='title' 
                value={todo.title} 
                onChange={handleEdit} 
                onBlur={saveTodo} 
                className='outline-none px-2 bg-slate-100 focus:outline-slate-300 focus:rounded-lg focus:outline' 
              />
            :
            <h3 
              onClick={e => setIsEditing(prev => (!prev))} 
              className='px-2'>
              {todo.title}
            </h3>
          }
          </div>

          <div className='flex row-span-1 items-center justify-end space-x-2'>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              onClick={event => props.handelDel(event, todo.id)} 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6 hover:cursor-pointer hover:fill-rose-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>

          <div className='mt-1 col-span-2'>
            {isEditing ?
              <input
                type="text"
                name='description'
                value={todo.description}
                onChange={handleEdit}
                onBlur={saveTodo}
                className='text-sm outline-none px-2 bg-slate-100 focus:outline-slate-300 focus:rounded-lg focus:outline'
              />
              :
              <p
                onClick={e => setIsEditing(prev => (!prev))}
                className='text-sm px-2'>
                {todo.description}
              </p>
            }
          </div>
      </div>
    </>
  )
}