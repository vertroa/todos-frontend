import Head from 'next/head'
import { TodoType } from '@/types/types'
import Todo from '../components/Todo'
import { useEffect, useState } from 'react'

 
export default function Home({ todos }: { todos: TodoType[] }) {
  const [todoListState, setTodoListState] = useState<TodoType[]>(todos)

  // Add button to create new todo
  async function handleAddButton(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Todo', description: 'New Todo Description', completed: false })
    };

    const addURL = `${process.env.NEXT_PUBLIC_API}/todos`
    console.log(addURL)
    const res = await fetch(addURL, requestOptions)
    const data: TodoType = await res.json()

    setTodoListState([
      ...todoListState, 
      data
    ])
  }

  // Delete button to delete todo
  async function handleDeleteButton(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    };
    
    const deleteURL = `${process.env.NEXT_PUBLIC_API}/todos/${id}`
    console.log(deleteURL)
    const res = await fetch(deleteURL, requestOptions)

    setTodoListState(todoListState.filter((todo) => todo.id !== id))
  }

  return (
  <>
    <header className='grid grid-cols-12 bg-red-500 py-4 text-3xl font-bold drop-shadow-md text-white '>
      <div className='col-span-1 md:col-span-3 xl:col-span-4'></div>
      <div className='col-span-10 md:col-span-6 xl:col-span-4 flex items-center justify-between'>
        <h1 className="">
          To Dos
        </h1>
        <button 
          onClick={handleAddButton} 
          className='cursor-pointer'>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="cursor-pointer w-8 h-8 hover:hover:fill-emerald-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div className='col-span-4'></div>
    </header>

    {todoListState.map((todo) => 
        <Todo key={todo.id} handelDel={handleDeleteButton} todo={todo}/>
    )}
  </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/todos/`)
  const todos = await res.json()

  return {
    props: {
      todos
    }
  }
}



