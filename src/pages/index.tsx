import Head from 'next/head'
import { TodoType } from '@/types/types'
import Todo from '../components/Todo'
import { useEffect, useState } from 'react'

 
export default function Home({ todos }: { todos: TodoType[] }) {
  const [todoListState, setTodoState] = useState<TodoType[]>(todos)

  async function handleAddButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'test', description: 'New Todo Description', completed: false })
    };

    const res = await fetch('http://localhost:8080/todos', requestOptions)
    const data: TodoType = await res.json()

    setTodoState([
      ...todoListState, 
      data
    ])
  }

  return (
    <>
      <header className='flex items-center justify-between bg-red-500 py-4 px-64 text-3xl font-bold drop-shadow-md text-white '>
        <h1 className="">
          To Dos
        </h1>
        <button onClick={handleAddButton} className='hover:cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 hover:hover:fill-emerald-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      {todoListState.map((todo) => 
          <Todo key={todo.id} todo={todo}/>
      )}
    </>
  )
}


export async function getServerSideProps() {
  const res = await fetch('http://localhost:8080/todos/')
  const todos = await res.json()

  return {
    props: {
      todos
    }
  }
}



